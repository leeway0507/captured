from typing import Dict, Tuple, Optional, List, Any
import json

from sqlalchemy.orm import Session
from sqlalchemy import and_, func

from logs.make_log import make_logger
from db.tables import ProductInfoTable, SizeTable

from model.db_model import ProductInfoSchema
from model.product_model import FilterMetaSchema, ProductResponseSchema, RequestFilterSchema
import time
from functools import cache

error_log = make_logger("logs/db/product.log")


def get_product_size(sku_list: List[int], db: Session) -> Dict[str, List[str]]:
    result = (
        db.query(SizeTable.sku, func.group_concat(SizeTable.size).label("size"))
        .filter(SizeTable.sku.in_(sku_list))
        .group_by(SizeTable.sku)
        .all()
    )
    return {row.sku: row.size.split(",") for row in result}


def get_init_category(page: int, limit: int, db: Session) -> ProductResponseSchema:
    # page to cursor
    page_cursor, last_page = get_page_cursor(page, limit, db)

    # query
    result = (
        db.query(ProductInfoTable)
        .filter(ProductInfoTable.sku < page_cursor)
        .order_by(ProductInfoTable.sku.desc())
        .limit(limit)
    )

    data = [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]

    return ProductResponseSchema(data=data, currentPage=page, lastPage=last_page)


def get_init_meta_data():
    with open("./json/init_meta.json", "r") as f:
        init_meta = json.load(f)
    return FilterMetaSchema(**init_meta).model_dump(by_alias=True)


def get_category(
    db: Session,
    page: int = 1,
    request_filter: Optional[RequestFilterSchema] = None,
    limit: int = 10,
) -> ProductResponseSchema:
    print("----------------------")
    print("filter category 시작")
    print("page", page)
    print("request_filter", request_filter)
    print("----------------------")

    # request_filter 없는 경우 get_init_category로
    if request_filter is None:
        print("request_filter 없는 경우 get_init_category로")
        print("----------------------")
        return get_init_category(page, limit, db)

    # request_filter가 있는 경우
    else:
        print("request_filter가 있는 경우")

        filter_query_dict = create_filter_query(request_filter)

        # page to cursor
        page_cursor, last_page = get_page_cursor(page, limit, db, query=(filter_query_dict))

        if last_page == 0:
            """필터 결과 없음"""
            return ProductResponseSchema(data=[], currentPage=0, lastPage=0)

        print("최종 필터 쿼리 :", filter_query_dict)
        print("최종 order_by :", filter_query_dict.get("order_by"))

        order_by = filter_query_dict.pop("order_by")

        if "size_array" in filter_query_dict.keys():
            result = (
                db.query(ProductInfoTable)
                .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                .filter(*filter_query_dict.values(), ProductInfoTable.sku < page_cursor)
                .group_by(ProductInfoTable.sku)
                .order_by(*order_by)
                .limit(limit)
            )

        # size filter가 없는 경우
        else:
            result = (
                db.query(ProductInfoTable)
                .filter(*filter_query_dict.values(), ProductInfoTable.sku < page_cursor)
                .order_by(*order_by)
                .limit(limit)
            )

        data = [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]
        return ProductResponseSchema(data=data, currentPage=page, lastPage=last_page)


def create_price_filter(price: str) -> List:
    print("price")
    print(price)
    price = price.split(",")

    if len(price) != 2:
        raise ValueError("price는 2개의 원소를 가져야 합니다.")

    price = list(map(int, price))

    if not isinstance(price[0], int) or not isinstance(price[1], int):
        raise ValueError("price의 원소는 int여야 합니다.")

    if price == [0, 0]:
        return []

    return sorted(price)


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
    filter_dict = {k: v.split(",") for k, v in filter_dict.items() if v != ""}
    filter_values = {
        "category": ProductInfoTable.category,
        "brand": ProductInfoTable.brand,
        "intl": ProductInfoTable.intl,
    }
    for k, v in filter_dict.items():
        filter_query_dict.update({k: filter_values[k].in_(v)})

    return filter_query_dict


def create_order_by_query(sort_by: str | None = None) -> List:
    """sort_by에 맞는 order_by query 생성"""
    if sort_by == "높은 가격 순":
        return [ProductInfoTable.price.desc(), ProductInfoTable.sku.desc()]

    if sort_by == "낮은 가격 순":
        return [ProductInfoTable.price.asc(), ProductInfoTable.sku.desc()]

    # if sort_by == "최신순" or sort_by == "인기순" or not sort_by:
    else:
        return [ProductInfoTable.sku.desc()]


def get_page_cursor(
    page: int, limit: int, db: Session, query: Optional[Dict[str, Any]] = None
) -> Tuple[int, int]:
    """page index에서 페이지에 해당하는 sku를 추출"""
    start = time.time()
    if query == None:
        query = {"order_by": [ProductInfoTable.sku.desc()]}

    page_idx = create_page_index(limit, db, query)
    end = time.time()
    print(f"create_page_index time|| page_cursor:{page_idx}", f"{end-start:.4f}")

    if not page_idx:
        return 0, 0

    last_page = max(page_idx.keys())
    if page > last_page:
        return page_idx[last_page], last_page
    return page_idx[page], last_page


def create_page_index(limit: int, db: Session, query: Dict[str, Any]) -> Dict[int, int]:
    """page index 생성"""
    local_query = query.copy()
    order_by = local_query.pop("order_by")

    has_filter = local_query.keys()

    if has_filter:
        # size filter가 있는 경우
        if "size_array" in local_query.keys():
            print("size filter가 존재하는 경우")
            sku_list = (
                db.query(ProductInfoTable.sku)
                .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
                .filter(*local_query.values())
                .group_by(ProductInfoTable.sku)
                .order_by(*order_by)
                .all()
            )

        # size filter가 없는 경우
        else:
            print("size filter가 없는 경우")
            sku_list = (
                db.query(ProductInfoTable.sku)
                .filter(*local_query.values())
                .order_by(*order_by)
                .all()
            )
    # filter가 없는 경우
    else:
        print("filter가 없는 경우")
        sku_list = db.query(ProductInfoTable.sku).order_by(*order_by).all()

    if not sku_list:
        return {}

    print("sku_list", sku_list)
    sku_list = list(map(lambda x: x[0], sku_list))
    index_dict = {i + 1: sku_list[i * limit] + 1 for i in range(0, len(sku_list) // limit + 1)}
    return index_dict


# def get_product(sku: int, db: Session) -> ProductInfoSchema:
#     result = db.query(ProductInfoTable).filter(ProductInfoTable.sku == sku).first()
#     return ProductInfoSchema(**result.to_dict()).model_dump(by_alias=True)

# def get_meta_data(product_list: list[Dict]) -> Dict[str, Any]:
#     category_sizes = defaultdict(set)

#     for product in product_list:
#         category = product["category"]
#         size = product["size"]
#         category_sizes[category].update(eval(size))

#     size_array = [
#         {
#             "size_type": category,
#             "size": list(sizes),
#             "default_size": product_json["size_type"][category],
#         }
#         for category, sizes in category_sizes.items()
#     ]

#     price = [product["price"] for product in product_list]

#     print(product_list)
#     print(price)

#     meta_data = {
#         "brand": list({d["brand"] for d in product_list}),
#         "category": list({d["category"] for d in product_list}),
#         "intl": list({"해외배송" if d["intl"] else "국내배송" for d in product_list}),
#         "size_array": size_array,
#         "price": list(set([price[0], price[-1]])),
#     }

#     print(filterMetaSchema(**meta_data).model_dump(by_alias=True))

#     return filterMetaSchema(**meta_data).model_dump(by_alias=True)
