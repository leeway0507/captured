"""ORM CRUD Setting"""

from typing import Any, List, Dict
from sqlalchemy.orm import Session
from pydantic.main import BaseModel
from sqlalchemy.dialects.mysql.dml import Insert

from . import connection as conn, tables
from model import db_model
from logs.make_log import make_logger

error_log = make_logger("logs/db/crud.log")


def execute_query(query) -> List[Any]:
    """esecute_query"""
    db_session = conn.connect_db(**conn.get_secret())
    result_list = db_session.execute(query)
    if db_session.is_active:
        db_session.close()
    return list(result_list)


class DB:
    """DB Base class"""

    def __init__(
        self, table: type[tables.MyBase], schema: type[BaseModel], session: Session
    ) -> None:
        self.table = table
        self.schema = schema
        self.session = session

    def __call__(self, *args: Any, **kwds: Any) -> Session:
        if self.session is None or not self.session.is_active:
            self.session = conn.connect_db(**conn.get_secret())
        return self.session

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close_session()

    def close_session(self):
        """close_session"""
        if self.session is not None and self.session.is_active:
            self.session.close()

    def insert(self, **kwargs):
        """insert an item into db"""
        pydantic_row = self.schema(**kwargs).model_dump()
        self.session.execute(pydantic_row)
        self.session.commit()
        return True

    def bulk_insert(self, rows: List[dict]):
        """insert many items into db"""

        pydantic_rows = [self.schema(**row).model_dump() for row in rows]

        try:
            self.session.bulk_insert_mappings(self.table, pydantic_rows)
            self.session.commit()

        except Exception as e:
            error_log.error(pydantic_rows[0])
            error_log.error(e)
            print("\n")
            print("-----------start inserting separately------------")
            print("\n")
            self.session.rollback()
            for row in pydantic_rows:
                self.insert(**row)
            error_log.info("개별 insert로 처리 완료")

        return True

    def update(self, primary_key: dict, value: dict):
        """update an item into db"""
        self.session.query(self.table).filter_by(**primary_key).update(value)
        self.session.commit()
        return True

    def bulk_update(self, rows: List[dict]):
        """update many items into db"""
        pydantic_rows = [self.schema(**row).model_dump() for row in rows]
        self.session.bulk_update_mappings(self.table, pydantic_rows)
        self.session.commit()
        return True

    def convert_query_result_to_dict(self, query_result: List) -> List[Dict[str, Any]]:
        result_dicts = [result.__dict__ for result in query_result]

        # Remove unnecessary keys
        for result_dict in result_dicts:
            result_dict.pop("_sa_instance_state", None)

        return result_dicts


# init session
init_session = conn.connect_db(**conn.get_secret())


class ProductInfo(DB):
    """
    product_card table에 대한 CRUD 수행
    """

    def __init__(self) -> None:
        table = tables.ProductInfoTable
        schema = db_model.ProductInfoSchema
        session = init_session
        super().__init__(table, schema, session)


class User(DB):
    """
    product_card table에 대한 CRUD 수행
    """

    def __init__(self) -> None:
        table = tables.UserTable
        schema = db_model.UserSchema
        session = init_session
        super().__init__(table, schema, session)


class UserAddress(DB):
    """
    user table에 대한 CRUD 수행
    """

    def __init__(self) -> None:
        table = tables.UserAddressTable
        schema = db_model.UserAddressSchema
        session = init_session
        super().__init__(table, schema, session)


class OrderHistory(DB):
    """
    order_history table에 대한 CRUD 수행
    """

    def __init__(self) -> None:
        table = tables.OrderHistoryTable
        schema = db_model.OrderHistorySchema
        session = init_session
        super().__init__(table, schema, session)


class OrderRow(DB):
    """
    order_row table에 대한 CRUD 수행
    """

    def __init__(self) -> None:
        table = tables.OrderHistoryTable
        schema = db_model.OrderRowSchmea
        session = init_session
        super().__init__(table, schema, session)
