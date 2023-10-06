from pydantic import BaseModel, validator, ConfigDict, EmailStr


class RegistrationSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    """Registration Schema"""
    email: EmailStr
    password: str
    kr_name: str
