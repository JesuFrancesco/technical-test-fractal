"""Package re-export for model classes.

This module keeps the original import path `models.models` working by
importing the model classes from their new locations and re-exporting them.
"""

from .orders import Order, ORDER_STATUSES  # re-export Order and statuses
from .products import Product

from .order_product import OrderProduct

__all__ = ["Order", "Product", "OrderProduct", "ORDER_STATUSES"]
