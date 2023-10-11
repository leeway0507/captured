"""mypage Router"""

from typing import Optional, List, Dict

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from model.auth_model import TokenData
from model.db_model import ProductInfoSchema, ProductInfoDBSchema

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *
from db.connection import conn_engine


product_router = APIRouter()


@product_router.get("/get-category")
async def get_item_list(db: Session = Depends(get_db)):
    """리스트 불러오기"""

    return get_category(db)


@product_router.get("/get-cursor-test")
async def get_item_list(cursor: int, db: Session = Depends(get_db)):
    """리스트 불러오기"""
    return get_cursor_test(cursor, db)


@product_router.post("/get-filtered-category")
async def get_filtered_item_list(
    page: int, meta: Optional[InitMetaSchema] = None, db: Session = Depends(get_db)
):
    """리스트 불러오기"""
    return get_filtered_category(db, page, meta)


@product_router.get("/get-product/{sku}")
async def get_a_single_product(sku: int, db: Session = Depends(get_db)) -> ProductInfoSchema:
    """제품 정보 불러오기"""
    return get_product(sku, db)


@product_router.get("/test")
async def get_item_list(db: Session = Depends(get_db)):
    """리스트 불러오기"""
    return get_infinite_scroll_product(db)
