from typing import Tuple, Dict, Optional
import json

from sqlalchemy import and_, func, select

from logs.make_log import make_logger
from db.tables import ProductInfoTable, SizeTable

from model.db_model import ProductInfoSchema
from model.product_model import (
    FilterMetaSchema,
    ProductResponseSchema,
    RequestFilterSchema,
)
from .filter import (
    create_order_by_filter,
    create_filter_query_dict,
    get_page_idx,
)
from db.connection import session_local

from sqlalchemy.ext.asyncio import AsyncSession
from custom_alru import alru_cache

error_log = make_logger("logs/db/product.log", "product_router")


async def get_product(sku: int, db: AsyncSession) -> ProductInfoSchema | None:
    result = await db.execute(
        select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
        .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
        .where(and_(SizeTable.sku == sku, ProductInfoTable.deploy == 1))
        .group_by(SizeTable.sku)
    )
    result = result.all()
    if result == []:
        return None
    return ProductInfoSchema(**result[0][0].to_dict(), size=result[0][1])


def get_init_meta_data():
    with open("./json/init_meta.json", "r") as f:
        init_meta = json.load(f)
    return FilterMetaSchema(**init_meta).model_dump(by_alias=True)


# @alru_cache()
async def get_category(
    sort_by: str = "최신순",
    category: Optional[str] = None,
    category_spec: Optional[str] = None,
    brand: Optional[str] = None,
    intl: Optional[str] = None,
    price: Optional[str] = None,
    size_array: Optional[str] = None,
    page: int = 1,
    limit: int = 24,
) -> ProductResponseSchema:
    request_filter = {
        "sort_by": sort_by,
        "category": category,
        "category_spec": category_spec,
        "brand": brand,
        "intl": intl,
        "price": price,
        "size_array": size_array,
    }

    page_idx = await get_page_idx(**request_filter, limit=limit)

    current_cursor, last_page = await get_page_cursor(page, page_idx)

    if current_cursor == -1:
        """필터 결과 없음"""
        return ProductResponseSchema(data=[], currentPage=0, lastPage=last_page)

    filter = create_filter_query_dict(**request_filter)
    sort_type, column, order_by = create_order_by_filter(request_filter.get("sort_by"))

    # print("-------get_category--------")
    # print("page_idx_cache_hit : ", get_page_idx.cache_info())
    # print("filter_cache_hit : ", create_filter_query_dict.cache_info())

    # group_by
    group_by = SizeTable.sku
    if "size_array" in filter.keys():
        group_by = ProductInfoTable.sku

    # # sort_type
    # print(sort_type, column, current_cursor)
    # if sort_type == "높은 가격 순":
    #     cursor_filter = column < current_cursor
    # else:
    #     cursor_filter = column < current_cursor

    db = session_local()
    result = await db.execute(
        select(ProductInfoTable, func.group_concat(SizeTable.size).label("size"))
        .join(SizeTable, ProductInfoTable.sku == SizeTable.sku)
        .where(*filter.values(), column < current_cursor, ProductInfoTable.deploy == 1)
        .group_by(group_by)
        .order_by(*order_by)
        .limit(limit)
    )
    await db.close()  # type: ignore

    data = [
        ProductInfoSchema(**row[0].to_dict(), size=row[1]).model_dump(by_alias=True)
        for row in result
    ]
    return ProductResponseSchema(data=data, currentPage=page, lastPage=last_page)


async def get_page_cursor(
    page: int, page_idx: Dict[int, int | str]
) -> Tuple[int | str, int]:
    """page index에서 페이지에 해당하는 sku를 추출"""

    # 제품이 없는 경우
    if not page_idx:
        return -1, 0

    # 마지막 페이지보다 큰 값을 요구할 경우 경우
    last_page = max(page_idx.keys())
    if page > last_page:
        return -1, last_page

    # print("page_idx 정상적으로 기입되는지 확인 ", "page : ", page, "page_index : ", page_idx)
    return page_idx[page], last_page


####### FILTER METHOD ##########
####### FILTER METHOD ##########
