from typing import Dict, Tuple, Optional, List, Any
import json

from sqlalchemy.orm import Session
from sqlalchemy import and_, func, select

from logs.make_log import make_logger
from db.tables import ProductInfoTable, SizeTable

from model.db_model import ProductInfoSchema
from model.product_model import FilterMetaSchema, ProductResponseSchema, RequestFilterSchema
import time
from sqlalchemy.ext.asyncio import AsyncSession

error_log = make_logger("logs/db/product.log", "product_router")


async def get_product(sku: int, db: AsyncSession) -> ProductInfoSchema | None:
    result = await db.execute(
        select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
        .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
        .filter(SizeTable.sku == sku)
        .group_by(SizeTable.sku)
    )
    result = result.all()
    if result == []:
        return None
    return ProductInfoSchema(**result[0][0].to_dict(), size=result[0][1])


async def get_init_category(page: int, limit: int, db: AsyncSession) -> ProductResponseSchema:
    # page to cursor
    page_cursor, last_page = await get_page_cursor(page, limit, db)

    # query
    result = await db.execute(
        select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
        .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
        .filter(ProductInfoTable.sku < page_cursor)
        .group_by(SizeTable.sku)
        .order_by(ProductInfoTable.sku.desc())
        .limit(limit)
    )

    data = [
        ProductInfoSchema(**row[0].to_dict(), size=row[1]).model_dump(by_alias=True)
        for row in result
    ]

    return ProductResponseSchema(data=data, currentPage=page, lastPage=last_page)


def get_init_meta_data():
    with open("./json/init_meta.json", "r") as f:
        init_meta = json.load(f)
    return FilterMetaSchema(**init_meta).model_dump(by_alias=True)


async def get_category(
    db: AsyncSession,
    page: int = 1,
    request_filter: Optional[RequestFilterSchema] = None,
    limit: int = 24,
) -> ProductResponseSchema:
    print("----------------------")
    print("filter category 시작")
    print("page", page)
    print("request_filter", request_filter)
    print("----------------------")

    # request_filter 없는 경우 get_init_category로
    if request_filter == None:
        print("request_filter 없는 경우 get_init_category로")
        print("----------------------")
        return await get_init_category(page, limit, db)

    has_filter = any(request_filter.model_dump().values())
    if not has_filter:
        print("request_filter 없는 경우 get_init_category로")
        print("----------------------")
        return await get_init_category(page, limit, db)

    # request_filter가 있는 경우
    else:
        print("request_filter가 있는 경우")

        filter_query_dict = create_filter_query(request_filter)

        # page to cursor
        page_cursor, last_page = await get_page_cursor(page, limit, db, query=(filter_query_dict))

        if last_page == 0:
            """필터 결과 없음"""
            return ProductResponseSchema(data=[], currentPage=0, lastPage=0)

        # print("최종 필터 쿼리 :", filter_query_dict)
        # print("최종 order_by :", filter_query_dict.get("order_by"))

        sort_type, cursor_query, order_by = filter_query_dict.pop("order_by")

        if "size_array" in filter_query_dict.keys():
            print("size filter가 있는 경우")
            result = await db.execute(
                select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
                .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                .filter(*filter_query_dict.values(), cursor_query < page_cursor)
                .group_by(ProductInfoTable.sku)
                .order_by(*order_by)
                .limit(limit)
            )

        else:
            if is_only_sort_by(request_filter):
                print("filter가 없고 오로지 sort_by만 있는 경우")
                result = await db.execute(
                    select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
                    .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                    .filter(cursor_query < page_cursor)
                    .group_by(SizeTable.sku)
                    .order_by(*order_by)
                    .limit(limit)
                )
            else:
                print("size filter가 없는 경우")

            result = await db.execute(
                select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
                .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                .filter(*filter_query_dict.values(), cursor_query < page_cursor)
                .group_by(SizeTable.sku)
                .order_by(*order_by)
                .limit(limit)
            )

        data = [
            ProductInfoSchema(**row[0].to_dict(), size=row[1]).model_dump(by_alias=True)
            for row in result
        ]
        return ProductResponseSchema(data=data, currentPage=page, lastPage=last_page)


async def get_page_cursor(
    page: int, limit: int, db: AsyncSession, query: Optional[Dict[str, Any]] = None
) -> Tuple[int | str, int]:
    """page index에서 페이지에 해당하는 sku를 추출"""
    start = time.time()
    if query == None:
        query = {"order_by": create_order_by_query()}

    page_idx = await create_page_index(limit, db, query)
    end = time.time()
    print(f"create_page_index time|| page_cursor:{page_idx}", f"{end-start:.4f}")

    if not page_idx:
        return 0, 0

    last_page = max(page_idx.keys())
    if page > last_page:
        return page_idx[last_page], last_page

    # print("page_idx 정상적으로 기입되는지 확인 ", "page : ", page, "page_index : ", page_idx)
    return page_idx[page], last_page


####### FILTER METHOD ##########
####### FILTER METHOD ##########


def is_only_sort_by(request_filter: RequestFilterSchema) -> bool:
    """sort_by만 있는 경우"""
    return not any(request_filter.model_dump().values())


def create_filter_query(filter: RequestFilterSchema) -> Dict[str, Any]:
    """
    RequestFilterSchema를 받아서 filter query와 order query를 생성
    """

    filter_query_dict = {}

    filter_dict = filter.model_dump()

    # order_query 생성
    order_by_value = filter_dict.pop("sort_by")
    order_list = create_order_by_query(sort_by=order_by_value)
    filter_query_dict.update({"order_by": order_list})

    # size filter 생성
    size_array = filter_dict.pop("size_array")
    if size_array:
        filter_query_dict.update({"size_array": SizeTable.size.in_(size_array.split(","))})

    # price filter 생성
    price = filter_dict.pop("price")  # range로 처리하기

    if price:
        price_filter = create_price_filter(price)
        filter_query_dict.update(
            {"price": ProductInfoTable.price.between({price_filter[0]}, {price_filter[1]})}
        )

    # category, brand, intl 생성
    filter_dict = {k: v.split(",") for k, v in filter_dict.items() if v != None and v != ""}

    # intl filter 수정
    if "intl" in filter_dict.keys():
        filter_dict["intl"] = list(
            map(lambda x: True if x == "해외배송" else False, filter_dict["intl"])
        )

    filter_values = {
        "category": ProductInfoTable.category,
        "category_spec": ProductInfoTable.category_spec,
        "brand": ProductInfoTable.brand,
        "intl": ProductInfoTable.intl,
    }
    for k, v in filter_dict.items():
        filter_query_dict.update({k: filter_values[k].in_(v)})

    return filter_query_dict


def create_order_by_query(sort_by: str | None = None) -> List:
    """sort_by에 맞는 order_by query 생성"""
    if sort_by == "높은 가격 순":
        return [
            "높은 가격 순",
            ProductInfoTable.price_desc_cursor,
            [ProductInfoTable.price.desc(), ProductInfoTable.sku.desc()],
        ]

    if sort_by == "낮은 가격 순":
        return [
            "낮은 가격 순",
            ProductInfoTable.price_asc_cursor,
            [ProductInfoTable.price.asc(), ProductInfoTable.sku.asc()],
        ]

    # if sort_by == "최신순" or sort_by == "인기순" or not sort_by:
    else:
        return ["최신순", ProductInfoTable.sku, [ProductInfoTable.sku.desc()]]


def create_price_filter(price: str) -> List:
    price_list = price.split(",")

    if len(price_list) != 2:
        raise ValueError("price는 2개의 원소를 가져야 합니다.")

    price_list = list(map(int, price_list))

    if not isinstance(price_list[0], int) or not isinstance(price_list[1], int):
        raise ValueError("price의 원소는 int여야 합니다.")

    if price_list == [0, 0]:
        return []

    return sorted(price_list)


async def create_page_index(
    limit: int, db: AsyncSession, query: Dict[str, Any]
) -> Dict[int, int | str]:
    """page index 생성"""
    local_query: Dict[str, Any] = query.copy()
    sort_type, cursor_query, order_by = local_query.pop("order_by")

    has_filter = local_query.keys()

    # filter가 있는 경우
    if has_filter:
        # size filter가 있는 경우
        if "size_array" in local_query.keys():
            print("create_page_index : size filter가 존재하는 경우")
            sku_list = await db.execute(
                select(cursor_query)
                .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                .filter(*local_query.values())
                .group_by(ProductInfoTable.sku)
                .order_by(*order_by)
            )
            sku_list = sku_list.all()

        # size filter가 없는 경우
        else:
            print("create_page_index : size filter가 없지만 filter는 존재하는 경우")
            sku_list = await db.execute(
                select(cursor_query).filter(*local_query.values()).order_by(*order_by)
            )
            sku_list = sku_list.all()

    # filter가 없는 경우
    else:
        print("create_page_index : filter가 없는 경우(order_by만 있는 경우도 포함)")
        sku_list = await db.execute(select(cursor_query).order_by(*order_by))
        sku_list = sku_list.all()

    if not sku_list:
        return {}
    print("-----create_page_index-----")
    print("sku_list", sku_list)
    return _get_index_by_sort_type(sort_type, sku_list, limit)


def _get_index_by_sort_type(sort_type: str, sku_list: List, limit: int) -> Dict[int, int | str]:
    if len(sku_list) % limit == 0:
        page = len(sku_list) // limit
    else:
        page = len(sku_list) // limit + 1

    if sort_type in ["높은 가격 순", "낮은 가격 순"]:
        # 높은 가격 순 일 땐 12자리, 낮은 가격 순 일 땐 11자리를 맞춰줘야함.

        zfill_value = 12 if sort_type == "높은 가격 순" else 11
        cursor_idx_list = list(map(lambda x: int(x[0]), sku_list))
        return {
            i + 1: str(cursor_idx_list[i * limit] + 1).zfill(zfill_value) for i in range(0, page)
        }

    else:
        sku_list = list(map(lambda x: x[0], sku_list))
        print("-----_get_index_by_sort_type-----")
        print("sku_list", sku_list)
        return {i + 1: int(sku_list[i * limit] + 1) for i in range(0, page)}
