"""pydantic Schemas for Auth"""

from pydantic import BaseModel,EmailStr, ConfigDict
from model.db_model import UserSchema


class LoginSchema(BaseModel):
    """user_login Schema"""
    model_config = ConfigDict(from_attributes=True)
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str = None

class LoginResponseSchema(BaseModel):
    """login_response Schema"""
    model_config = ConfigDict(from_attributes=True)
    user_id :int
    email: EmailStr
    kr_name :str
    email_verification:bool
    access_token: Token