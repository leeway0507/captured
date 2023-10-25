"""Auth Router 
로그인은 OAuth2PasswordRequestForm을 사용하여 수행 
- Form Data로 email, password를 받아서 authenticate_user 함수를 통해 인증
- content-type은 application/x-www-form-urlencoded로 설정해야함.

인증이 필요한 API인 경우 Depends(get_current_user) 포함
request -> oauth2_scheme -> get_current_user -> user_schema 순으로 진행
    - oauth2_scheme의 기능은 header Authentication에 있는 token을 추출하는 역할을 수행
    
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from model.auth_model import LoginSchema, LoginResponseSchema
from model.db_model import UserAddressSchema
from model.registration_model import EmailRegistrationSchema, RegistrationOauthSchema
from db.connection import get_db
from sqlalchemy.ext.asyncio import AsyncSession

from .utils import *

auth_router = APIRouter()


@auth_router.post("/signin", response_model=LoginResponseSchema)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    """로그인 수행"""

    user = await authenticate_user(
        db, LoginSchema(email=form_data.username, password=form_data.password)
    )

    assert isinstance(user, UserSchema), HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="user is not UserSchema"
    )

    return {
        **user.model_dump(),
        **create_access_token_form(user.user_id).model_dump(by_alias=False),
    }


@auth_router.get("/sign-in-sns", response_model=LoginResponseSchema)
async def user_check(id: str, db: AsyncSession = Depends(get_db)) -> dict[str, bool]:
    """유저 존재 여부 체크"""
    user = await get_user_by_user_id(db, id)

    if user == 404:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="email not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    assert isinstance(user, UserSchema), HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="user is not UserSchema"
    )

    return {**user.model_dump(), **create_access_token_form(user.user_id).model_dump()}


@auth_router.get("/email-check")
async def email_check(email: str, db: AsyncSession = Depends(get_db)) -> dict[str, bool]:
    """이메일 중복 체크"""
    user_info = await get_user_by_email(db, email)
    return {"isUnique": user_info is None}


# @auth_router.get("/user-check")
# async def user_check(id: str, db: AsyncSession = Depends(get_db)) -> dict[str, bool]:
#     """유저 존재 여부 체크"""
#     user_info = get_user_by_user_id(db, id)
#     return {"is_existed": user_info is not None}


@auth_router.post("/register", status_code=201, response_model=LoginResponseSchema)
async def register(
    user_registration: EmailRegistrationSchema,
    address: UserAddressSchema,
    db: AsyncSession = Depends(get_db),
):
    """회원가입"""
    user = await register_user_and_address(db, user_registration, address)

    if not user:
        raise HTTPException(status_code=406, detail="회원가입에 실패했습니다. 다시 시도해주세요.")

    assert isinstance(user, UserSchema), HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="user is not UserSchema"
    )
    return {**user.model_dump(), **create_access_token_form(user.user_id).model_dump()}


@auth_router.post("/register-oauth", status_code=201, response_model=LoginResponseSchema)
async def register_oauth(
    auth_user_registration: RegistrationOauthSchema, db: AsyncSession = Depends(get_db)
):
    user = await register_auth_user(auth_user_registration, db)
    if not user:
        raise HTTPException(status_code=406, detail="회원가입에 실패했습니다. 다시 시도해주세요.")

    return {**user.model_dump(), **create_access_token_form(user.user_id).model_dump()}


@auth_router.get("/check-email-and-name")
async def check_email_and_name(name: str, email: str, db: AsyncSession = Depends(get_db)):
    """이름과 이메일 중복 체크"""
    user_info = await get_user_by_email_and_name(db, name, email)
    verification = user_info is not None
    if verification:
        return {"token": create_access_token_form(user_info.user_id).model_dump()["access_token"]}
    else:
        raise HTTPException(status_code=400, detail="일치하는 정보가 없습니다.")
