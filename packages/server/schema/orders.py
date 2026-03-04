from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import Field

from utils.camelcase import CamelModel

from schema.order_product import OrderProductDTO


class AddOrderDTO(CamelModel):
    products: list[OrderProductDTO] = None


class OrderResponseDTO(CamelModel):
    id: int
    code: str
    status: str
    order_date: datetime
    order_items: list[OrderProductDTO]


class OrderSummaryResponseDTO(CamelModel):
    id: int
    code: str
    order_date: datetime
    products_count: int
    final_price: Decimal


class UpdateOrderDTO(CamelModel):
    status: Optional[str] = Field(None)


__all__ = ["AddOrderDTO", "UpdateOrderDTO", "OrderResponseDTO"]
