from typing import Any

from sqlalchemy.orm import Session
from sqlalchemy import func

from logs.make_log import make_logger
from db.tables import ProductInfoTable
from db.connection import commit
from model.db_model import ProductInfoSchema, ProductInfoDBSchema

error_log = make_logger("logs/db/product.log")


def get_product(db: Session) -> list[dict[str, Any]]:
    result = db.query(ProductInfoTable).all()
    return [ProductInfoSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]


def create_product(db: Session, product: ProductInfoDBSchema):
    query = db.add(ProductInfoTable(**product.model_dump()))

    return commit(db, query, error_log)


def update_product():
    pass


def delete_product():
    pass


def create_new_sku(db: Session):
    column = ProductInfoTable.sku
    last_number = db.query(column).order_by(column.desc()).first()

    if last_number == None:
        return 1

    return last_number[0] + 1
