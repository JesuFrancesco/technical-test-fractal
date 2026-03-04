from pydantic import Field

from utils.camelcase import CamelModel
from schema.products import ProductResponseDTO


class NestedOrderProductDTO(CamelModel):
    product_id: int
    quantity: int = Field(..., gt=0)


class OrderProductDTO(CamelModel):
    # product_id: int
    product: ProductResponseDTO
    quantity: int = Field(..., gt=0)
