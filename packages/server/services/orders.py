import uuid

from sqlalchemy import func
from sqlalchemy.orm import Session

from schema.orders import OrderProductType
from models import Order, OrderProduct


def create_order(db_session: Session, order_products: list[OrderProductType]) -> Order:
    order = Order(
        code=f"ORD-{uuid.uuid4().hex[:8]}",
        status="PENDING",
    )

    db_session.add(order)
    db_session.flush()  # Generates order.id

    # Attach order items using relationship (cleaner)
    for op in order_products:
        order_item = OrderProduct(
            product_id=op.product_id,
            quantity=op.quantity,
        )
        order.order_items.append(order_item)

    db_session.commit()
    db_session.refresh(order)

    return order


def get_all_orders(db_session) -> list[Order]:
    return db_session.query(Order).all()


def get_order_by_id(db_session, order_id: int) -> Order | None:
    return db_session.query(Order).filter(Order.id == order_id).first()


def delete_order_by_id(db_session, order_id: int) -> None:
    order = get_order_by_id(db_session, order_id)

    if not order:
        raise ValueError(f"Order with id {order_id} not found")

    db_session.delete(order)
    db_session.commit()


def update_order_status(db_session, order_id: int, new_status: str) -> Order:
    order = get_order_by_id(db_session, order_id)

    if not order:
        raise ValueError(f"Order with id {order_id} not found")

    order.status = new_status
    db_session.commit()
    db_session.refresh(order)
    return order
