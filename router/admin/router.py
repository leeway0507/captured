"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import OrderHistorySchema, OrderRowSchmea

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *

admin_router = APIRouter()


@admin_router.get("/get-order-history")
async def get_order_history_list(db: Session = Depends(get_db)):
    """order_history 조회"""
    return get_order_history(db)


@admin_router.get("/get-order-row")
async def get_order_rows(db: Session = Depends(get_db)):
    """order_row 조회"""
    return get_order_row(db)
