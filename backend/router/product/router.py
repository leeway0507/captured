"""mypage Router"""

from typing import Optional, List, Dict

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from model.auth_model import TokenData
from model.db_model import ProductInfoSchema, ProductInfoDBSchema
from model.product_model import RequestFilterSchema

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *
from db.connection import conn_engine


product_router = APIRouter()


@product_router.post("/get-category")
async def get_filtered_item_list(
    page: int, filter: Optional[RequestFilterSchema] = None, db: Session = Depends(get_db)
):
    """리스트 불러오기"""
    return get_category(db, page, filter)


@product_router.get("/get-product/{sku}")
async def get_a_single_product(sku: int, db: Session = Depends(get_db)) -> ProductInfoSchema:
    """제품 정보 불러오기"""
    return get_product(sku, db)


@product_router.get("/get-filter-meta")
async def get_init_meta():
    return get_init_meta_data()
