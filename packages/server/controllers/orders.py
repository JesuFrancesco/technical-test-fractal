from fastapi import APIRouter, Depends, HTTPException
from database import get_session
from sqlalchemy.orm import Session
from schema.orders import AddOrderRequest, OrderResponse
from services.orders import (
    create_order,
    get_all_orders,
    update_order_status,
    delete_order_by_id,
)

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_all_orders_endpoint(
    session: Session = Depends(get_session),
):
    try:
        return get_all_orders(db_session=session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
def create_new_order_endpoint(
    request: AddOrderRequest, session: Session = Depends(get_session)
) -> OrderResponse:
    order_products = request.products
    try:
        return create_order(db_session=session, order_products=order_products)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{order_id}")
def delete_order_endpoint(order_id: int, session: Session = Depends(get_session)):
    try:
        return delete_order_by_id(db_session=session, order_id=order_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{order_id}")
def update_order_endpoint(order_id: int, session: Session = Depends(get_session)):
    try:
        return update_order_status(
            db_session=session, order_id=order_id, new_status="COMPLETED"
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
