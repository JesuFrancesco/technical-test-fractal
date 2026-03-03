from pydantic import Field

from utils.camelcase import CamelModel


class OrderProductType(CamelModel):
    product_id: int
    quantity: int = Field(..., gt=0)
