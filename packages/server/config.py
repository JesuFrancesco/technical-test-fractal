import os
from typing import Optional


def _get_env(key: str, default: Optional[str] = None) -> Optional[str]:
    val = os.getenv(key, default)
    return val


class Config:
    DB_USER = _get_env("DB_USER")
    DB_PASSWORD = _get_env("DB_PASSWORD")
    DB_HOST = _get_env("DB_HOST")
    DB_PORT = _get_env("DB_PORT")
    DB_NAME = _get_env("DB_NAME")
    CORS_ORIGINS = (
        _get_env("CORS_ORIGINS").split(",")
        if _get_env("CORS_ORIGINS")
        else ["http://localhost:5173", "http://localhost:8080"]
    )


config = Config()
