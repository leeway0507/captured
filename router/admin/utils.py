from typing import Any

from sqlalchemy.orm import Session
from sqlalchemy import func

from logs.make_log import make_logger
from db.tables import OrderHistoryTable, OrderRowTable
from db.connection import commit
from model.db_model import OrderHistoryInDBSchema, OrderRowInDBSchmea

error_log = make_logger("logs/admin/util.log")


def get_order_history(db: Session):
    result = db.query(OrderHistoryTable).all()
    return [OrderHistoryInDBSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]


def get_order_row(db: Session):
    result = db.query(OrderRowTable).all()
    return [OrderRowInDBSchmea(**row.to_dict()).model_dump(by_alias=True) for row in result]
