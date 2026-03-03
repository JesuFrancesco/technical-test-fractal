from models import Product


def create_product(db_session, name: str, price: float, stock: int) -> Product:
    product = Product(name=name, price=price, stock=stock)
    db_session.add(product)
    db_session.commit()
    db_session.refresh(product)
    return product


def get_all_products(db_session) -> list[Product]:
    return db_session.query(Product).all()


def get_product_by_id(db_session, product_id: int) -> Product | None:
    return db_session.query(Product).filter(Product.id == product_id).first()


def update_product(
    db_session, product_id: int, name: str, price: float, stock: int
) -> Product:
    product = get_product_by_id(db_session, product_id)

    if not product:
        raise ValueError(f"Product with id {product_id} not found")

    product.name = name
    product.price = price
    product.stock = stock

    db_session.commit()
    db_session.refresh(product)
    return product


def delete_product(db_session, product_id: int) -> None:
    product = get_product_by_id(db_session, product_id)

    if not product:
        raise ValueError(f"Product with id {product_id} not found")

    db_session.delete(product)
    db_session.commit()
