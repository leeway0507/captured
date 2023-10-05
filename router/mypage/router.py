"""mypage Router 
"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from model.auth_model import TokenData
from model.db_model import UserAddressSchema, UserAddressInDBSchema
from model.registration_model import RegistrationSchema

from router.auth import get_current_user
from router.mypage import *
from db.connection import get_db
from .lib.utils import *

mypage_router = APIRouter()


@mypage_router.get("/get-address")
async def get_address(
    user: TokenData = Depends(get_current_user), db: Session = Depends(get_db)
) -> List[UserAddressSchema]:
    return get_user_address(db, user)


@mypage_router.post("/create-address")
async def create_address(
    address: UserAddressSchema,
    user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if create_user_address(db, user, address):
        return {"message": "success"}
    else:
        return HTTPException(status_code=406, detail="주소등록에 실패했습니다. 다시 시도해주세요.")
