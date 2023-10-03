"""pydantic Schemas"""

from pydantic import BaseModel, validator,ConfigDict, EmailStr

from typing import List, Any,Optional


class ProductInfoSchema(BaseModel):
    """ProductInfoTable Schema"""
    model_config = ConfigDict(from_attributes=True)

    sku :int
    brand :str
    product_name :str
    product_id :str
    size :str # List[str]
    price :int
    intl :bool
    search_info :str 
    color :str # List[str]
    category :str
    img_type :str

    @validator("size",pre=True)
    def convert_size_list_str(cls, value:List[str]) -> str:
        return str(value)
    
    @validator("color",pre=True)
    def convert_color_list_str(cls, value:List[str]) -> str:
        return str(value)
    

class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    """User Schema"""
    user_id :int
    email: EmailStr
    password :str
    kr_name :str
    email_verification:bool



class UserAddressSchema(BaseModel):
    """UserAddresTable Schema"""

    model_config = ConfigDict(from_attributes=True)

    # volume_id: int
    address_id: str = None # UA-[user_id]-[0~n]
    user_id: str = None
    kr_name: str
    en_name: str
    custom_id: str
    phone: str
    kr_address: str
    kr_address_detail: str
    en_address: str
    en_address_detail: str
    permanent: bool = False


class OrderHistorySchmea(BaseModel):
    """OrderHistoryTable Schema"""
    model_config = ConfigDict(from_attributes=True)

    order_id: str
    user_id :int
    address_id :str
    order_date :str
    user_order_number :int
    order_status :str
    order_total_price :int


class OrderRowSchmea(BaseModel):
    """OrderRowTable Schema"""
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_id: str
    sku: int
    size: str
    delivery_status: str
    delivery_company: str
    delivery_number: str




