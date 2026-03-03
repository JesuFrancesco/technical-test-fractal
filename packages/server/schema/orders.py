from datetime import datetime
from typing import Optional

from pydantic import Field

from utils.camelcase import CamelModel

from schema.order_product import OrderProductType


class AddOrderRequest(CamelModel):
    products: list[OrderProductType] = None


class OrderResponse(CamelModel):
    id: int
    code: str
    status: str
    order_date: datetime
    order_items: list[OrderProductType]


class UpdateOrderRequest(CamelModel):
    status: Optional[str] = Field(None)


__all__ = ["AddOrderRequest", "UpdateOrderRequest", "OrderResponse"]
