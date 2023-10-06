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


@product_router.get("/get-product")
async def get_product_list(db: Session = Depends(get_db)) -> List[ProductInfoSchema]:
    return get_product(db)


@product_router.post("/create-product")
async def create_address(product: ProductInfoSchema, db: Session = Depends(get_db)):
    """주소 생성"""
    product.sku = create_new_sku(db)
    searh_info = product.brand + " " + product.product_name + " " + product.product_id
    product_info_db = ProductInfoDBSchema(search_info=searh_info, **product.model_dump())

    if create_product(db, product_info_db):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="제품 등록 실패. 다시 시도해주세요.")


# @product_router.post("/update-product")
# async def update_address(address: UserAddressSchema, db: Session = Depends(get_db)):
#     """주소 수정"""

#     user_address_db = UserAddressInDBSchema(user_id=user.user_id, **address.model_dump())
#     if update_user_address(db, user_address_db):
#         return {"message": "success"}
#     else:
#         return HTTPException(status_code=406, detail="주소 업데이트에 실패했습니다. 다시 시도해주세요.")


# @product_router.post("/delete-product")
# async def delete_address(address: UserAddressSchema, db: Session = Depends(get_db)):
#     """주소 삭제"""
#     if delete_user_address(db, address.address_id):
#         return {"message": "success"}
#     else:
#         return HTTPException(status_code=406, detail="주소 삭제에 실패했습니다. 다시 시도해주세요.")
