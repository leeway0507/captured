"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import ProductInfoSchema, ProductInfoDBSchema

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .utils import *
from router.product.utils import *

admin_router = APIRouter()


@admin_router.get("/get-order-history")
async def get_order_history_list(db: Session = Depends(get_db)):
    """order_history 조회"""
    return get_order_history(db)


@admin_router.get("/get-order-row")
async def get_order_rows(db: Session = Depends(get_db)):
    """order_row 조회"""
    return get_order_row(db)


@admin_router.get("/get-category")
async def get_item_list(db: Session = Depends(get_db)):
    """리스트 불러오기"""
    return get_category(db)


@admin_router.get("/get-cursor-test")
async def get_item_list(page: int, db: Session = Depends(get_db)):
    """리스트 불러오기"""
    print("page", page)
    return get_cursor_test(db, page)


####################################################
@admin_router.get("/get-infinite-scroll-product")
async def get_test(db: Session = Depends(get_db)):
    """무한스크롤 테스트"""
    return create_page_index(db)


####################################################


@admin_router.post("/create-product")
async def create(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """제품 생성"""
    product.sku = create_new_sku(db)
    searh_info = product.brand + " " + product.product_name + " " + product.product_id
    product_info_db = ProductInfoDBSchema(search_info=searh_info, **product.model_dump())

    if create_product(db, product_info_db):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 등록 실패. 다시 시도해주세요.")


@admin_router.post("/update-product")
async def update(product_in_db: ProductInfoDBSchema, db: Session = Depends(get_db)):
    """제품 수정"""
    if update_product(db, product_in_db):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 업데이트에 실패했습니다. 다시 시도해주세요.")


@admin_router.post("/delete-product")
async def delete(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """제품 삭제"""
    if product.sku == None:
        return HTTPException(status_code=406, detail="제품정보에 SKU가 존재하지 않아 삭제할 수 없습니다.")
    if delete_product(db, product.sku):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 삭제에 실패했습니다. 다시 시도해주세요.")
