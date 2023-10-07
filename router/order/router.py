"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import (
    OrderHistorySchema,
    OrderRowSchmea,
    OrderHistoryInDBSchema,
    OrderRowInDBSchmea,
)

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *

order_router = APIRouter()


@order_router.post("/create-order-history")
async def create_order_history(
    order_history: OrderHistorySchema,
    db: Session = Depends(get_db),
    user: TokenData = Depends(get_current_user),
):
    """주문내역 생성"""
    order_history.user_id = int(user.user_id)
    order_count = get_user_order_count(db)
    order_id = f"OH-{user.user_id}-{order_count}"
    order_history_in_db = OrderHistoryInDBSchema(
        **order_history.model_dump(),
        order_id=order_id,
        user_order_number=order_count,
    )
    if create_order_history_into_db(order_history_in_db, db):
        return {"orderId": order_id}
    else:
        raise HTTPException(status_code=400, detail="주문내역 생성 실패")


@order_router.post("/create-order-row")
async def create_order_row(
    order_id: str,
    order_row: OrderRowSchmea,
    db: Session = Depends(get_db),
    user_id: TokenData = Depends(get_current_user),
):
    """주문상세내역 생성"""
    order_row_in_db = OrderRowInDBSchmea(
        **order_row.model_dump(), user_id=user_id, order_id=order_id
    )
    if create_order_row_into_db(order_row_in_db, db):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=400, detail="주문상세내역 생성 실패")
