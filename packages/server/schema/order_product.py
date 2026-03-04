from pydantic import Field

from utils.camelcase import CamelModel
from schema.products import ProductResponseDTO


class OrderProductDTO(CamelModel):
    # product_id: int
    product: ProductResponseDTO
    quantity: int = Field(..., gt=0)
