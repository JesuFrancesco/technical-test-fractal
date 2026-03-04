from decimal import Decimal
from typing import Optional

from pydantic import Field

from utils.camelcase import CamelModel


class ProductResponseDTO(CamelModel):
    id: int
    name: str
    price: Decimal
    stock: int
    # is_active: bool


class AddProductDTO(CamelModel):
    name: str = Field(..., min_length=1)
    price: Decimal = Field(..., ge=0)
    stock: int = Field(0, ge=0)
    # is_active: bool = Field(True)


class UpdateProductDTO(CamelModel):
    name: Optional[str] = None
    price: Optional[Decimal] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)
    # is_active: Optional[bool] = None


__all__ = ["AddProductDTO", "UpdateProductDTO", "ProductResponseDTO"]
