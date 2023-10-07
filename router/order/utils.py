from typing import Any

from sqlalchemy.orm import Session
from sqlalchemy import func

from logs.make_log import make_logger
from db.tables import OrderHistoryTable, OrderRowTable
from db.connection import commit
from model.db_model import OrderHistoryInDBSchema, OrderRowInDBSchmea

from passlib.context import CryptContext

error_log = make_logger("logs/db/product.log")


def get_user_order_count(db: Session):
    column = OrderHistoryTable.order_id
    last_number = db.query(column).order_by(column.desc()).first()

    if last_number == None:
        return 1

    return last_number[0] + 1


def create_order_history_into_db(order_history: OrderHistoryInDBSchema, db: Session):
    query = db.add(OrderHistoryTable(**order_history.model_dump()))
    return commit(db, query, error_log)


def create_order_row_into_db(order_row: OrderRowInDBSchmea, db: Session):
    query = db.add(OrderRowTable(**order_row.model_dump()))
    return commit(db, query, error_log)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_payment_info_hash(payment_info: str) -> str:
    """결제정보를 hash로 변경"""
    return pwd_context.hash(payment_info)


def verify_payment_info(plain_payment_info, hashed_payment_info) -> bool:
    """요청한 결제정보와 DB내 hash된 결제정보를 비교"""
    return pwd_context.verify(plain_payment_info, hashed_payment_info)
