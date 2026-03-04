import os
from typing import Generator, Optional

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import declarative_base, Session

from config import config


def get_database_url() -> str:
    # If DB name not provided fall back to a harmless sqlite memory DB so imports/tests don't fail.
    if not config.DB_NAME:
        return "sqlite:///:memory:"

    # Quote password only if present
    auth = (
        f"{config.DB_USER}:{config.DB_PASSWORD}@"
        if config.DB_PASSWORD
        else f"{config.DB_USER}@"
    )
    return f"mysql+pymysql://{auth}{config.DB_HOST}:{config.DB_PORT}/{config.DB_NAME}"


def create_engine_from_env(
    echo: bool = False, pool_size: int = 5, max_overflow: int = 10
) -> Engine:
    """Create a SQLAlchemy Engine using environment configuration."""
    url = get_database_url()
    engine = create_engine(
        url, echo=echo, pool_size=pool_size, max_overflow=max_overflow, future=True
    )
    return engine


# module-level engine and session factory (can be re-created by tests)
engine: Engine = create_engine_from_env()
Base = declarative_base()


def get_session() -> Generator[Session, None, None]:
    if engine is None:
        raise ValueError("Database engine is not initialized.")
    with Session(engine) as session:
        yield session


def create_tables(target_engine: Optional[Engine] = None) -> None:
    """Create all tables for declarative Base on the provided engine (or the module engine)."""
    eng = target_engine or engine
    Base.metadata.create_all(bind=eng)
