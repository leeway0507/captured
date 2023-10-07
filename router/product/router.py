"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import ProductInfoSchema, ProductInfoDBSchema

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *

product_router = APIRouter()


@product_router.get("/get-category")
async def get_item_list(db: Session = Depends(get_db)) -> List[ProductInfoSchema]:
    """리스트 불러오기"""
    return get_category(db)


@product_router.get("/get-product/{sku}")
async def get_a_single_product(sku: int, db: Session = Depends(get_db)) -> ProductInfoSchema:
    """제품 정보 불러오기"""
    return get_product(sku, db)


@product_router.post("/create-product")
async def create(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """제품 생성"""
    product.sku = create_new_sku(db)
    searh_info = product.brand + " " + product.product_name + " " + product.product_id
    product_info_db = ProductInfoDBSchema(search_info=searh_info, **product.model_dump())

    if create_product(db, product_info_db):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 등록 실패. 다시 시도해주세요.")


@product_router.post("/update-product")
async def update(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """제품 수정"""
    if update_product(db, product):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 업데이트에 실패했습니다. 다시 시도해주세요.")


@product_router.post("/delete-product")
async def delete(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """제품 삭제"""
    if delete_product(db, product.sku):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 삭제에 실패했습니다. 다시 시도해주세요.")
