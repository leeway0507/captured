"""pydantic Schemas"""

from pydantic import BaseModel, validator, ConfigDict, EmailStr, Field
from pydantic.alias_generators import to_camel

from typing import List, Any, Optional
from datetime import datetime


class ProductInfoSchema(BaseModel):
    """ProductInfoTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sku: Optional[int]
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

    @validator("size", "color", pre=True)
    def str_to_list(cls, v: str) -> str:
        """str to list to str"""
        if isinstance(v, eval(v)):
            return [str(i) for i in v]
        else:
            print(type(v), v)
            raise ValueError("size, color must be stringfied list")


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

    address_id: Optional[str]  # UA-[user_id]-[0~n]
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

    user_id: Optional[int]
    permanent: bool = False


class OrderHistorySchema(BaseModel):
    """OrderHistoryTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    user_id: Optional[int]
    order_date: datetime
    address_id: str
    order_total_price: int
    payment_method: str
    payment_info: str  # hash # 카드번호 & 계좌번호 등..


class OrderHistoryInDBSchema(OrderHistorySchema):
    """OrderHistoryTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    order_id: str  # OH-[user_id]-[user_order_number]
    user_order_number: int
    order_status: str = "배송준비"  # 배송준비/배송중/배송완료/반품중/취소요청/환불완료
    payment_status: str = "승인대기"  # 승인대기/승인완료/결제취소
    payment_info: str  # hash # 카드번호 & 계좌번호 등..


class OrderRowSchmea(BaseModel):
    """OrderRowTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sku: int
    size: str
    quantity: int


class OrderRowInDBSchmea(OrderRowSchmea):
    """OrderRowTable Schema"""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    order_row_id: Optional[int] = Field(default=None, primary_key=True)
    order_id: str
    delivery_status: str = ""
    delivery_company: str = ""
    delivery_number: str = ""
