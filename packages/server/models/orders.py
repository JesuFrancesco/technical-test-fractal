from sqlalchemy import (
    Column,
    String,
    DateTime,
    Enum,
    CheckConstraint,
    UniqueConstraint,
    func,
    # ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.mysql import BIGINT as MYSQL_BIGINT

from database import Base


ORDER_STATUSES = ("PENDING", "IN_PROGRESS", "COMPLETED")


class Order(Base):
    __tablename__ = "orders"

    id = Column(MYSQL_BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    code = Column(String(50), nullable=False, unique=True)
    order_date = Column(DateTime, nullable=False, server_default=func.now())
    status = Column(Enum(*ORDER_STATUSES, name="order_status"), nullable=False)

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(
        DateTime, nullable=False, server_default=func.now(), server_onupdate=func.now()
    )

    order_items = relationship(
        "OrderProduct", back_populates="order", cascade="all, delete-orphan"
    )
    products = association_proxy("order_items", "product")

    __table_args__ = (
        UniqueConstraint("code", name="uq_orders_code"),
        CheckConstraint(
            "status IN ('PENDING','IN_PROGRESS','COMPLETED')",
            name="chk_orders_status",
        ),
    )

    def __repr__(self) -> str:  # pragma: no cover - convenience
        return f"<Order id={self.id} code={self.code} status={self.status}>"


__all__ = ["Order", "ORDER_STATUSES"]
