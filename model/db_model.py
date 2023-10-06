"""pydantic Schemas"""

from pydantic import BaseModel, validator, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel

from typing import List, Any, Optional


class ProductInfoSchema(BaseModel):
    """ProductInfoTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sku: int = None
    brand: str
    product_name: str
    product_id: str
    size: str  # List[str]
    price: int
    shipping_fee: int
    intl: bool
    color: str  # List[str]
    category: str
    img_type: str


class ProductInfoDBSchema(ProductInfoSchema):
    """ProductInfoTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    search_info: str


class UserSchema(BaseModel):

    """User Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    user_id: int
    email: EmailStr
    kr_name: str
    email_verification: bool


class UserIndDBSchema(UserSchema):
    """User Schema in DB"""

    password: str


class UserAddressSchema(BaseModel):
    """UserAddresTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    address_id: str = None  # UA-[user_id]-[0~n]
    kr_name: str
    en_name: str
    custom_id: str
    phone: str
    kr_address: str
    kr_address_detail: str
    en_address: str
    en_address_detail: str


class UserAddressInDBSchema(UserAddressSchema):
    """UserAddresTable Schema"""

    user_id: int = None
    permanent: bool = False


class OrderHistorySchema(BaseModel):
    """OrderHistoryTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    order_id: str
    user_id: int
    address_id: str
    order_date: str
    user_order_number: int
    order_status: str
    order_total_price: int


class OrderRowSchmea(BaseModel):
    """OrderRowTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    id: int
    order_id: str
    sku: int
    size: str
    delivery_status: str
    delivery_company: str
    delivery_number: str
