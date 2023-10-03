"""pydantic Schemas for Auth"""

from pydantic import BaseModel,EmailStr, ConfigDict


class UserLoginSchema(BaseModel):
    """user_login Schema"""
    model_config = ConfigDict(from_attributes=True)
    email: EmailStr
    password: str