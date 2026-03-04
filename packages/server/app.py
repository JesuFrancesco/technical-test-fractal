from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from controllers import orders_router, products_router
from database import create_tables
from config import config


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api/v1")

router.include_router(orders_router)
router.include_router(products_router)

app.include_router(router)
