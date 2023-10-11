from pydantic import BaseModel, validator, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel
from typing import List, Optional

## filter model


class SizeObjectSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    size_type: str
    size: List[str]
    default_size: Optional[List[str]]


class filterMetaSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    brand: List[str]
    category: List[str]
    intl: List[str]
    price: List[int]
    size_array: List[SizeObjectSchema]


class BrandMetaSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    sort_by: List[str]
    category: List[str]
    intl: List[str]
    price: List[int]
    size_array: List[str]
    page: int


class InitMetaSchema(BrandMetaSchema):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    brand: List[str]
