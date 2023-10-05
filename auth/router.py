from fastapi import APIRouter, Depends,HTTPException,status
from fastapi.security import OAuth2PasswordRequestForm


from model.auth_model import LoginSchema,LoginResponseSchema
from model.db_model import UserAddressSchema,UserSchema
from model.registration_model import RegistrationSchema

from auth.lib.utils import *

router = APIRouter()



@router.post("/signin", response_model=LoginResponseSchema)
async def signin(form_data: OAuth2PasswordRequestForm = Depends()):
    """로그인 수행"""

    user = authenticate_user(LoginSchema(email=form_data.username,password=form_data.password))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
            )
    return { **user.model_dump(), "access_token" : create_access_token_form(user.email)}



@router.get("users/me", response_model=UserSchema)
async def read_users_me(current_user: UserSchema = Depends(get_verfied_user)):
    """인증하는 기본 양식"""
    return current_user



@router.get("/email-check")
async def email_check(email:str):
    """이메일 중복 체크"""
    user_info = get_user_by_email(email)
    return {'isUnique': user_info is None}



@router.post("/register",status_code=201,response_model=LoginResponseSchema)
async def register(user:RegistrationSchema,address:UserAddressSchema):
    """회원가입"""
    if register_user_and_address(user,address): 
        email = user.email  
        return { **get_user_by_email(email), "access_token" : create_access_token_form(email)}
    else : 
        return HTTPException(status_code=406, detail="failed to register")



