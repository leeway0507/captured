from typing import Dict
from fastapi import APIRouter, Depends,Request
from model.auth_model import UserLoginSchema
from model.db_model import UserAddressSchema
from model.registration_model import RegistrationSchema
from auth.lib.jwt_handler import sign_jwt
from auth.lib.jwt_bearer import jwtBearer
from auth.lib.register import register_user_and_address,get_user_by_email


router = APIRouter()



@router.get("/", dependencies=[Depends(jwtBearer())])
async def read_root():
    return {"Hello": "auth"}

@router.post("/email-check")
async def read_raw_body(request: Request):
    req_body = await request.body()
    email = req_body.decode('utf-8')
    user_info = get_user_by_email(email)
    print(user_info)
    
    return {'isUnique': user_info is None}


@router.post("/register",status_code=201)
async def register(user:RegistrationSchema,address:UserAddressSchema):
    register_user_and_address(user,address)
    return sign_jwt(user.email)



def check_user(data:UserLoginSchema):
    for user in users :
        if user.email == data.email and user.password == data.password:
            return True
    return False


@router.post("/login")
async def login(data:UserLoginSchema) -> Dict[str,str]|str:
    if check_user(data):
        return sign_jwt(data.email)
    return {"error":"Wrong Credentials"}

