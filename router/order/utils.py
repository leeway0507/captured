from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import func

from logs.make_log import make_logger
from db.tables import OrderHistoryTable, OrderRowTable, ProductInfoTable
from db.connection import commit
from model.db_model import (
    OrderHistoryInDBSchema,
    OrderRowInDBSchmea,
    OrderRowResponseSchema,
    OrderHistoryResponseSchema,
)

from passlib.context import CryptContext
from datetime import datetime

error_log = make_logger("logs/db/product.log")


def get_user_order_count(db: Session):
    last_number = db.query(OrderHistoryTable).count()

    if last_number is None:
        return 1

    return last_number + 1


def create_order_history_into_db(order_history: OrderHistoryInDBSchema, db: Session):
    query = db.add(OrderHistoryTable(**order_history.model_dump()))
    return commit(db, query, error_log)


def create_order_row_into_db(order_row: List[OrderRowInDBSchmea], db: Session):
    query = db.bulk_insert_mappings(
        OrderRowTable, [order_row.model_dump() for order_row in order_row]
    )
    return commit(db, query, error_log)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_payment_info_hash(payment_info: str) -> str:
    """결제정보를 hash로 변경"""
    return pwd_context.hash(payment_info)


def verify_payment_info(plain_payment_info, hashed_payment_info) -> bool:
    """요청한 결제정보와 DB내 hash된 결제정보를 비교"""
    return pwd_context.verify(plain_payment_info, hashed_payment_info)


def get_order_history_from_db(db: Session, user_id: str):
    """주문 내역 조회"""
    result = (
        db.query(OrderHistoryTable)
        .filter(OrderHistoryTable.user_id == user_id)
        .order_by(OrderHistoryTable.ordered_at.desc())
        .limit(20)
        .all()
    )
    return [OrderHistoryResponseSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]


def get_order_row_from_db(db: Session, order_id: str):
    """주문 상세 내역 조회"""
    result = (
        db.query(
            OrderRowTable,
            ProductInfoTable.brand,
            ProductInfoTable.product_name,
            ProductInfoTable.product_id,
            ProductInfoTable.price,
            ProductInfoTable.shipping_fee,
            ProductInfoTable.intl,
        )
        .join(ProductInfoTable, ProductInfoTable.sku == OrderRowTable.sku)
        .filter(OrderRowTable.order_id == order_id)
        .all()
    )

    return [
        OrderRowResponseSchema(
            **row[0].to_dict(),
            brand=row[1],
            product_name=row[2],
            product_id=row[3],
            price=row[4],
            shipping_fee=row[5],
            intl=row[6]
        ).model_dump(by_alias=True)
        for row in result
    ]
