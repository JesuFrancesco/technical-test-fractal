import uuid

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from schema.orders import OrderProductDTO
from models import Order, OrderProduct


def create_order(db_session: Session, order_products: list[OrderProductDTO]) -> Order:
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


def get_all_orders_summarized(db_session):
    orders = (
        db_session.query(Order)
        .options(joinedload(Order.order_items).joinedload(OrderProduct.product))
        .all()
    )

    result = []

    for order in orders:
        products_count = sum(item.quantity for item in order.order_items)
        final_price = sum(
            item.quantity * item.product.price for item in order.order_items
        )

        result.append(
            {
                "id": order.id,
                "code": order.code,
                "orderDate": order.order_date,
                "productsCount": products_count,
                "finalPrice": final_price,
            }
        )

    return result


def get_order_by_id(db_session, order_id: int) -> Order | None:
    return db_session.query(Order).filter(Order.id == order_id).first()


def delete_order_by_id(db_session, order_id: int) -> None:
    order = get_order_by_id(db_session, order_id)

    if not order:
        raise ValueError(f"Order with id {order_id} not found")

    db_session.delete(order)
    db_session.commit()


def update_order_products(db_session: Session, order_id: int, products: list):
    order = get_order_by_id(db_session, order_id)

    if not order:
        raise ValueError(f"Order with id {order_id} not found")

    order.order_items.clear()

    for item in products:
        if item.quantity <= 0:
            raise ValueError("Quantity must be greater than 0")

        order.order_items.append(
            OrderProduct(
                product_id=item.product_id,
                quantity=item.quantity,
            )
        )

    db_session.commit()
    db_session.refresh(order)

    return order
