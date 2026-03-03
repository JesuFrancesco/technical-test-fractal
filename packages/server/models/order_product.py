from sqlalchemy import Column, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import BIGINT as MYSQL_BIGINT, INTEGER as MYSQL_INTEGER

from database import Base


class OrderProduct(Base):
    __tablename__ = "order_product"

    order_id = Column(
        MYSQL_BIGINT(unsigned=True),
        ForeignKey("orders.id", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )
    product_id = Column(
        MYSQL_BIGINT(unsigned=True),
        ForeignKey("products.id", ondelete="RESTRICT", onupdate="CASCADE"),
        primary_key=True,
    )
    quantity = Column(MYSQL_INTEGER(unsigned=True), nullable=False)

    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")

    __table_args__ = (CheckConstraint("quantity > 0", name="chk_op_quantity"),)

    def __repr__(self) -> str:  # pragma: no cover - convenience
        return f"<OrderProduct order_id={self.order_id} product_id={self.product_id} quantity={self.quantity}>"


__all__ = ["OrderProduct"]
