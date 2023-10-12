from pydantic import BaseModel, validator, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel
from typing import List, Optional, Dict
from model.db_model import ProductInfoSchema

## filter model


class FilterMetaSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sort_by: List[str]
    category: Optional[List[str]]  # clothing, shoes 카테고리에서 사용 x
    brand: Optional[List[str]]  # brand 카테고리에서 사용 x
    intl: List[str]
    price: List[int]
    size_array: List[str]


class RequestFilterSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sort_by: str
    category: Optional[str]  # clothing, shoes 카테고리에서 사용 x
    brand: Optional[str]  # brand 카테고리에서 사용 x
    intl: str
    price: str
    size_array: str


class ProductResponseSchema(BaseModel):
    data: List[Dict]
    currentPage: int
    lastPage: int
