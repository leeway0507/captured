"""db connection"""

from typing import Dict

from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from decouple import config


def connect_db(username: str, password: str, host: str, db_name: str, **_kwargs) -> Session:
    """
    sseion 연결

    Args:
        username (str): db username
        password (str): db password
        host (str): db host
        db_name (str): db name

    Returns:
        sessionmaker : 연결된 db ssesion

    """

    ###############
    # DB Session using Sqlalchemy.orm

    engine = conn_engine(username, password, host, db_name)
    session_local = sessionmaker(bind=engine)
    return session_local()


def conn_engine(username: str, password: str, host: str, db_name: str, **_kwargs):
    db_url = f"mysql+pymysql://{username}:{password}@{host}:3306/{db_name}"
    return create_engine(db_url)


def get_secret() -> Dict[str, str]:
    username = config("DB_USER_NAME")
    password = config("DB_PASSWORD")
    host = config("DB_HOST")
    db_name = config("DB_NAME")

    assert isinstance(username, str), "username is not str"
    assert isinstance(password, str), "password is not str"
    assert isinstance(host, str), "host is not str"
    assert isinstance(db_name, str), "db_name is not str"

    return {
        "username": username,
        "password": password,
        "host": host,
        "db_name": db_name,
    }


engine = conn_engine(**get_secret())
session_local = sessionmaker(bind=engine)


def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


def commit(db: Session, query: callable, error_log: callable = None):
    try:
        query
        db.commit()
        return True
    except Exception as e:
        if error_log:
            error_log.error(e)
        else:
            print(e)
        db.rollback()
        print("커밋 실패 후 rollback")
        return False