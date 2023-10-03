from sqlalchemy.dialects.mysql import VARCHAR, INTEGER, DATE, BOOLEAN
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class ProductInfoTable(Base):
    __tablename__ = "product_info"

    sku = Column(INTEGER, primary_key=True)
    brand = Column(VARCHAR(50))
    product_name = Column(VARCHAR(255))
    product_id = Column(VARCHAR(255))
    size = Column(VARCHAR(255))
    price = Column(INTEGER)
    itnl = Column(BOOLEAN)
    search_info = Column(VARCHAR(255))
    color = Column(VARCHAR(50))
    category = Column(VARCHAR(50))
    img_type = Column(VARCHAR(10))

    class Config:
        orm_mode = str


class UserTable(Base):
    __tablename__ = "user"

    user_id = Column(INTEGER, primary_key=True, autoincrement=True, server_default='10000') # start from 10000
    email = Column(VARCHAR(255), nullable=False, unique=True)
    password = Column(VARCHAR(255), nullable=False)
    kr_name = Column(VARCHAR(30), nullable=False)
    email_verification = Column(BOOLEAN, nullable=False, default=False)

    class Config:
        orm_mode = str


class UserAddressTable(Base):
    __tablename__ = "user_address"
    address_id = Column(VARCHAR(255), primary_key=True)
    user_id = Column(INTEGER, ForeignKey("user.user_id"), nullable=False)
    kr_name = Column(VARCHAR(30), nullable=False)
    en_name = Column(VARCHAR(30), nullable=False)
    custom_id = Column(VARCHAR(50), nullable=False)
    phone = Column(VARCHAR(20), nullable=False)
    kr_address = Column(VARCHAR(255), nullable=False)
    kr_address_detail = Column(VARCHAR(255), nullable=False)
    en_address = Column(VARCHAR(255), nullable=False)
    en_address_detail = Column(VARCHAR(255), nullable=False)
    permanent = Column(BOOLEAN, nullable=False, default=False)

    user = relationship("UserTable")

    class Config:
        orm_mode = str


class OrderHistoryTable(Base):
    __tablename__ = "order_history"
    order_id = Column(VARCHAR(255), primary_key=True)
    user_id = Column(INTEGER, ForeignKey("user.user_id"), nullable=False)
    address_id = Column(VARCHAR(255), ForeignKey("user_address.address_id"), nullable=False)
    order_date = Column(DATE, nullable=False)
    user_order_number = Column(INTEGER, nullable=False)
    order_status = Column(VARCHAR(50), nullable=False)
    order_total_price = Column(INTEGER, nullable=False)

    user = relationship("UserTable")
    address = relationship("UserAddressTable")

    class Config:
        orm_mode = str


class OrderRowTable(Base):
    __tablename__ = "order_row"
    order_row_id = Column(INTEGER, primary_key=True, autoincrement=True)
    order_id = Column(VARCHAR(255), ForeignKey("order_history.order_id"), nullable=False)
    sku = Column(INTEGER, ForeignKey("product_info.sku"), nullable=False)
    delivery_status = Column(VARCHAR(10), nullable=False)
    delivery_company = Column(VARCHAR(30), nullable=False)
    delivery_number = Column(VARCHAR(50), nullable=False)

    order = relationship("OrderHistoryTable")
    product = relationship("ProductInfoTable")

    class Config:
        orm_mode = str
    




