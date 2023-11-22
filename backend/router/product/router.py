"""product Router"""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from model.db_model import ProductInfoSchema
from model.product_model import RequestFilterSchema
from .utils import *
from db.connection import get_db


product_router = APIRouter()


@product_router.post("/get-category")
async def get_filtered_item_list(
    page: int,
    filter: Optional[RequestFilterSchema] = None,
    db: AsyncSession = Depends(get_db),
):
    """리스트 불러오기"""
    return await get_category(db, page, filter)


@product_router.get("/get-product/{sku}")
async def get_a_single_product(
    sku: int, db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """제품 정보 불러오기"""
    result = await get_product(sku, db)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="제품 정보가 없습니다."
        )
    return result.model_dump(by_alias=True)


@product_router.get("/get-filter-meta")
def get_init_meta():
    return get_init_meta_data()
