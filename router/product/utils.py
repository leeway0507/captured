from typing import Any, Dict
import json

from sqlalchemy.orm import Session
from sqlalchemy import and_, desc, asc  # 필수(eval에서 사용)

from logs.make_log import make_logger
from db.tables import ProductInfoTable

from model.db_model import ProductInfoSchema
from model.meta_model import InitMetaSchema
import time
from functools import cache

error_log = make_logger("logs/db/product.log")

with open("./json/init_meta.json", "r") as f:
    init_meta = json.load(f)


def get_category(db: Session) -> list[Dict]:
    page_idx = create_page_index(db)
    last_page = max(page_idx.keys())
    result = db.query(ProductInfoTable).order_by(desc(ProductInfoTable.sku)).limit(5)

    x = [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]

    return {
        "data": x,
        "meta": get_init_meta_data(),
        "currentPage": 1,
        "lastPage": last_page,
    }


def get_cursor_test(db: Session, page: int = 1):
    page_idx = create_page_index(db)
    last_page = max(page_idx.keys())
    if last_page < page:
        return []
    result = (
        db.query(ProductInfoTable)
        .filter(ProductInfoTable.sku < page_idx[page])
        .order_by(desc(ProductInfoTable.sku))
        .limit(5)
    )
    return {
        "data": [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result],
        "currentPage": page,
        "lastPage": last_page,
    }


def get_init_meta_data():
    return init_meta


def get_filtered_category(
    db: Session,
    page: int = None,
    filter: InitMetaSchema = None,
) -> list[ProductInfoSchema] | list:
    print("----------------------")
    print("filter category 시작")
    print("page", page)
    print("filter", filter)
    print("----------------------")

    # filter 없는 경우 init으로
    if page is None and filter is None:
        print("filter 없는 경우 init으로")
        return get_category(db)

    # filter는 없고 page만 있는 경우
    if page and filter is None:
        print("filter는 없고 page만 있는 경우")
        page_idx = create_page_index(db)
        last_page = max(page_idx.keys())
        if last_page < page:
            return []
        result = (
            db.query(ProductInfoTable)
            .filter(ProductInfoTable.sku < page_idx[page])
            .order_by(desc(ProductInfoTable.sku))
            .limit(5)
        )
        x = [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]
        print("----------------------")
        print("page_idx", page_idx)
        print("page_idx[page]", page_idx[page])
        print(x)
        print("----------------------")

    # filter가 있는 경우
    if filter:
        print("filter가 있는 경우")
        filter_dict = filter.model_dump()
        order_by_value = create_order_by_query(filter_dict.pop("sort_by"))
        filter_query = create_filter_query(filter_dict)
        page_idx = create_page_index(
            db,
            filter=(
                filter_query,
                order_by_value,
            ),
        )
        last_page = max(page_idx.keys())

        # page는 없는 경우 page = 1
        if page == None:
            page = 1

        # 요청 페이지가 최종 페이지보다 큰 경우 page = 마지막 페이지
        if last_page < page:
            page = last_page

        print("flter의 page ", page)
        result = (
            db.query(ProductInfoTable)
            .filter(eval(filter_query))
            .filter(ProductInfoTable.sku < page_idx[page])
            .order_by(order_by_value)
            .limit(5)
        )

    x = [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]

    return {
        "data": x,
        "meta": get_init_meta_data(),
        "currentPage": page,
        "lastPage": last_page,
    }


def create_filter_query(filter_dict: Dict[str, any]) -> list[ProductInfoSchema] | list:
    filter_query = ""

    if filter_dict.get("price"):
        price = filter_dict.pop("price")  # range로 처리하기
        if not isinstance(price, list):
            raise ValueError("price는 list로 받아야 합니다.")
        if len(price) != 2:
            raise ValueError("price는 2개의 원소를 가져야 합니다.")
        if not isinstance(price[0], int) or not isinstance(price[1], int):
            raise ValueError("price의 원소는 int여야 합니다.")

        price = sorted(price)
        filter_query += f"ProductInfoTable.price.between({price[0]}, {price[1]}),"

    filter_dict = {k: v for k, v in filter_dict.items() if v != []}
    if not filter_dict:
        return "No filter"

    # fleter query 생성
    for k, v in filter_dict.items():
        filter = f"ProductInfoTable.{k}.in_({v})"
        filter_query += filter + ","

    filter_query = filter_query[:-1]
    return filter_query


def create_order_by_query(sort_by: str | None = None) -> list[ProductInfoSchema] | list:
    if sort_by == "최신순" or sort_by == "인기순" or not sort_by:
        return "ProductInfoTable.sku.desc()"

    if sort_by == "높은 가격 순":
        return "ProductInfoTable.price.desc()"

    if sort_by == "낮은 가격 순":
        # 가격 낮은 순 => price Asc
        return "ProductInfoTable.price.asc()"


def get_product(sku: int, db: Session) -> ProductInfoSchema:
    result = db.query(ProductInfoTable).filter(ProductInfoTable.sku == sku).first()
    return ProductInfoSchema(**result.to_dict()).model_dump(by_alias=True)


def get_infinite_scroll_product(db: Session):
    query = db.query(ProductInfoTable).order_by(desc(ProductInfoTable.sku))
    return query


@cache
def create_page_index(db: Session, filter: tuple = None):
    limit_items = 5
    start = time.time()

    if filter is None:
        sku_list = db.query(ProductInfoTable.sku).order_by(desc(ProductInfoTable.sku)).all()
    else:
        sku_list = (
            db.query(ProductInfoTable.sku).filter(eval(filter[0])).order_by(eval(filter[1])).all()
        )

    sku_list = list(map(lambda x: x[0], sku_list))
    index_dict = {
        i + 1: sku_list[i * limit_items] + 1 for i in range(0, len(sku_list) // limit_items + 1)
    }

    end = time.time()
    print("query time: ", f"{end-start:.4f}")

    return index_dict


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
