"""mypage Router"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import UserAddressSchema, UserAddressInDBSchema

from router.auth import get_current_user, reset_user_password
from router.mypage import *
from db.connection import get_db
from .utils import *

mypage_router = APIRouter()


@mypage_router.get("/get-address")
async def get_address(
    user: TokenData = Depends(get_current_user), db: Session = Depends(get_db)
) -> List[UserAddressSchema]:
    return get_user_address(db, user)


@mypage_router.get("/get-address-info")
async def get_address_info_by_id(
    address_id: str, user: TokenData = Depends(get_current_user), db: Session = Depends(get_db)
) -> UserAddressSchema:
    return get_user_address_info(db, address_id)


@mypage_router.post("/create-address")
async def create_address(
    address: UserAddressSchema,
    user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """주소 생성"""
    address.address_id = create_new_address_id(db, user.user_id)
    new_address = UserAddressInDBSchema(user_id=user.user_id, **address.model_dump())

    if create_user_address(db, new_address):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=406, detail="주소 등록에 실패했습니다. 다시 시도해주세요.")


@mypage_router.post("/update-address")
async def update_address(
    address: UserAddressSchema,
    user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """주소 수정"""

    user_address_db = UserAddressInDBSchema(user_id=user.user_id, **address.model_dump())
    if update_user_address(db, user_address_db):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=406, detail="주소 업데이트에 실패했습니다. 다시 시도해주세요.")


@mypage_router.post("/delete-address")
async def delete_address(
    address: UserAddressSchema,
    user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """주소 삭제"""
    if delete_user_address(db, address.address_id):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=406, detail="주소 삭제에 실패했습니다. 다시 시도해주세요.")


@mypage_router.post("/resset-password")
async def reset_password(
    request: dict, user: TokenData = Depends(get_current_user), db: Session = Depends(get_db)
):
    """비밀번호 변경"""

    assert request.get("password"), HTTPException(status_code=406, detail="비밀번호를 전달받지 못했습니다.")

    if reset_user_password(db, request.get("password"), user.user_id):
        return {"message": "success"}
    else:
        raise HTTPException(status_code=406, detail="비밀번호 변경에 실패했습니다. 다시 시도해주세요.")
