from typing import List
from sqlalchemy import and_

from sqlalchemy.orm import Session

from model.db_model import UserAddressInDBSchema, UserAddressSchema
from model.auth_model import TokenData

from db.tables import UserAddressTable
from db.connection import commit
from logs.make_log import make_logger


error_log = make_logger("logs/db/mypage.log")


def get_user_address(db: Session, user: TokenData) -> List[UserAddressSchema]:
    """주소 불러오기"""
    filter_condition = and_(
        UserAddressTable.user_id == user.user_id, UserAddressTable.permanent == False
    )

    result = db.query(UserAddressTable).filter(filter_condition).all()
    return [UserAddressSchema(**row.to_dict()).model_dump(by_alias=True) for row in result]


def create_user_address(db: Session, user_address_db: UserAddressInDBSchema) -> bool:
    """주소 생성"""

    query = db.add(UserAddressTable(**user_address_db.model_dump()))
    return commit(db, query, error_log)


def update_user_address(db: Session, user_address_db: UserAddressInDBSchema) -> bool:
    """주소 업데이트"""

    # 영구 보관 주소는 수정할 수 없음
    address_id = user_address_db.address_id
    if int(address_id.split("-")[-1]) > 1000:
        return False

    query = (
        db.query(UserAddressTable)
        .filter(UserAddressTable.address_id == address_id)
        .update(user_address_db.model_dump())
    )
    return commit(db, query, error_log)


def delete_user_address(db: Session, user_addres_id: str) -> bool:
    """주소 삭제"""

    # 메인 주소는 수정만 가능
    v = user_addres_id.split("-")[-1]
    if v == "0":
        error_log.error(f"{user_addres_id} : 메인 주소는 삭제할 수 없습니다.")
        return False
    query = (
        db.query(UserAddressTable).filter(UserAddressTable.address_id == user_addres_id).delete()
    )
    return commit(db, query, error_log)


def create_new_address_id(db: Session, user_id: str):
    """새로운 주소 id 생성"""
    column = UserAddressTable.address_id
    condition = and_(UserAddressTable.user_id == user_id, UserAddressTable.permanent == False)
    last_number = db.query(column).filter(condition).order_by(column.desc())

    # last_number = (query, query_result=tuple(result)) 구성임. 따라서 last_number[0][0]으로 값을 추출
    last_number = last_number[0][0].split("-")[-1]

    return f"UA-{user_id}-{int(last_number)+1}"
