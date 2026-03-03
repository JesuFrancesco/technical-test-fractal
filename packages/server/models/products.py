from sqlalchemy import (
    Column,
    String,
    DateTime,
    # Text,
    Numeric,
    CheckConstraint,
    func,
    # Boolean,
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import BIGINT as MYSQL_BIGINT, INTEGER as MYSQL_INTEGER

from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(MYSQL_BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    name = Column(String(150), nullable=False)
    price = Column(Numeric(12, 2), nullable=False)
    stock = Column(MYSQL_INTEGER(unsigned=True), nullable=False, server_default="0")
    # is_active = Column(Boolean, nullable=False, server_default="1")

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(
        DateTime, nullable=False, server_default=func.now(), server_onupdate=func.now()
    )

    order_items = relationship("OrderProduct", back_populates="product")

    __table_args__ = (
        CheckConstraint("price >= 0", name="chk_products_price"),
        CheckConstraint("stock >= 0", name="chk_products_stock"),
    )

    def __repr__(self) -> str:  # pragma: no cover - convenience
        return f"<Product id={self.id} name={self.name} price={self.price} stock={self.stock}>"


__all__ = ["Product"]
