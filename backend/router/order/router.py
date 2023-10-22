"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import (
    OrderHistoryRequestSchema,
    OrderRowSchmea,
    OrderHistoryInDBSchema,
    OrderRowInDBSchmea,
)

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *

order_router = APIRouter()


@order_router.get("/get-order-history")
async def get_order_history(
    db: Session = Depends(get_db),
    user: TokenData = Depends(get_current_user),
):
    """주문 내역 조회"""
    order_history = get_order_history_from_db(db, user.user_id)
    return order_history


@order_router.get("/get-order-row")
async def get_order_row(
    order_id: str,
    db: Session = Depends(get_db),
    user: TokenData = Depends(get_current_user),
):
    """주문 상세내역 조회"""
    order_row = get_order_row_from_db(db, order_id)
    return order_row


@order_router.post("/create-order-history")
async def create_order_history(
    order_history: OrderHistoryRequestSchema,
    db: Session = Depends(get_db),
    user: TokenData = Depends(get_current_user),
):
    """주문 내역 생성"""
    order_count = get_user_order_count(db)
    order_id = f"OH-{user.user_id}-{order_count}"
    order_history.user_id = user.user_id
    order_history_in_db = OrderHistoryInDBSchema(
        **order_history.model_dump(),
        order_id=order_id,
        user_order_number=order_count,
        ordered_at=datetime.now(),
    )
    if create_order_history_into_db(order_history_in_db, db):
        return {"orderId": order_id}
    else:
        raise HTTPException(status_code=400, detail="주문내역 생성 실패")


@order_router.post("/create-order-row")
async def create_order_row(
    order_id: str,
    order_rows: List[OrderRowSchmea],
    db: Session = Depends(get_db),
    user_id: TokenData = Depends(get_current_user),
):
    """
    주문 상세내역 생성
    주문 내역과 구분한 이유는 orderHistory가 성공적으로 생성되었는지 확인하기 위함
    """
    order_row_in_db_list = []
    for order_row in order_rows:
        order_row_in_db_list.append(
            OrderRowInDBSchmea(**order_row.model_dump(), user_id=user_id, order_id=order_id)
        )
    if create_order_row_into_db(order_row_in_db_list, db):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=400, detail="주문상세내역 생성 실패")
