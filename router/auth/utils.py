"""인증과 관련된 함수 정의"""

from typing import Dict
from datetime import datetime, timedelta

import jwt
from decouple import config
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session


from model.db_model import UserSchema, UserAddressSchema, UserIndDBSchema, UserAddressInDBSchema
from model.registration_model import RegistrationSchema
from model.auth_model import LoginSchema, TokenData, Token
from db.crud import User, UserAddress
from logs.make_log import make_logger
from db.tables import UserTable, UserAddressTable


JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = config("ACCESS_TOKEN_EXPIRE_MINUTES", cast=int)

assert isinstance(JWT_ALGORITHM, str), "JWT_ALGORITHM is not 'str' type"
assert isinstance(JWT_SECRET, str), "JWT_SECRET is not 'str' type"
assert isinstance(ACCESS_TOKEN_EXPIRE_MINUTES, int), "ACCESS_TOKEN_EXPIRE_MINUTES is not 'int' type"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/signin")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password) -> bool:
    """요청한 비밀번호와 DB내 hash된 비밀번호를 비교"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password) -> str:
    """비밀번호를 hash로 변경"""
    return pwd_context.hash(password)


def authenticate_user(db: Session, login: LoginSchema) -> UserSchema | None:
    """
    로그인 요청한 유저가 DB에 있는지 확인
    - args : LoginSchema(email, password)
    - return : UserSchema | bool
    """

    user_db = get_user_db_by_email(db, login.email)
    if user_db is None:
        return None
    if not verify_password(login.password, user_db.password):
        return None
    return UserSchema(**user_db.model_dump())


def create_access_token(data: Dict, expires_delta: timedelta | None = None) -> str:
    """
    JWT 토큰 생성
    - args : data({key:value}), expires_delta(timedelta)
    - return : str
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_access_token_form(user_id) -> Token:
    """
    JWT 토큰 생성
    - args : user_id(str)
    - return : Token(access_token, token_type)
    """
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"user_id": user_id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    """
    JWT 토큰 decode를 통해 얻은 user_id로 유저 정보(UserSchema)를 반환
    - args : token(str)
    - return : TokenData
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="해당 토큰의 인증 정보가 없습니다.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    exp_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="요청기간이 만료됐습니다. 재로그인 해주세요.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception

        expire_time: int = payload.get("exp")
        if expire_time is None or expire_time < datetime.utcnow().timestamp():
            raise exp_exception

        token_data = TokenData(user_id=int(user_id))

    except jwt.PyJWTError as e:
        error_log.error(e)
        raise credentials_exception

    return token_data


# async def get_verfied_user(
#     current_user: UserSchema = Depends(get_current_user),
# ) -> UserSchema | Dict[str, str]:
#     """
#     해당 사용자가 email 인증을 완료했는지 체크
#     - args : userSchema
#     - return : UserSchema
#     """

#     if current_user.email_verification is False:
#         raise HTTPException(status_code=401, detail="이메일 인증이 필요합니다.")

#     return current_user


error_log = make_logger("logs/db/register.log")


def register_user_and_address(
    db: Session, user_registration: RegistrationSchema, address: UserAddressSchema
) -> UserSchema | None:
    """
    회원가입 시 user, address 정보를 DB에 저장 | 성공 & 실패 여부에 따라 UserSchema 반환
    - args : user(RegistrationSchema), address(UserAddressSchema)
    - return : bool
    """

    try:
        # add user info
        user_registration.password = get_password_hash(user_registration.password)
        print(
            "user_db에서 user_id가 자동으로 매칭되는지 확인해보기",
            UserTable(**user_registration.model_dump()).to_dict(),
        )
        db.add(UserTable(**user_registration.model_dump()))
        db.commit()

        # add address info
        user = get_user_by_email(db, user_registration.email)
        if user is None:
            raise ValueError("user is None!!!")

        user_address_in_db = UserAddressInDBSchema(
            address_id=f"OH-{user.user_id}-0", user_id=user.user_id, **address.model_dump()
        )
        db.add(UserAddressTable(**user_address_in_db.model_dump()))
        db.commit()
        return user

    except Exception as e:
        error_log.error(e)
        db.rollback()
        return None


def get_user_by_email(db: Session, email: str) -> UserSchema | None:
    """email을 통해 user정보 획득"""

    result = db.query(UserTable).filter(UserTable.email == email).first()  # type: ignore

    if result is None:
        return None

    result = result.to_dict()
    result.pop("password")
    return UserSchema(**result)


def get_user_db_by_email(db: Session, email: str) -> UserIndDBSchema | None:
    """email을 통해 user_db(user + 비밀번호) 획득"""

    result = db.query(UserTable).filter(UserTable.email == email).first()  # type: ignore

    if result is None:
        return None

    result = result.to_dict()
    return UserIndDBSchema(**result)
