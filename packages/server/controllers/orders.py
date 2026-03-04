import traceback

from fastapi import APIRouter, Depends, HTTPException
from database import get_session
from sqlalchemy.orm import Session
from schema.orders import (
    AddOrderDTO,
    OrderResponseDTO,
    OrderSummaryResponseDTO,
    UpdateOrderDTO,
)
from services.orders import (
    create_order,
    get_all_orders,
    get_all_orders_summarized,
    get_order_by_id,
    update_order_products,
    delete_order_by_id,
)

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/summarized")
def get_all_orders_summarized_endpoint(
    session: Session = Depends(get_session),
) -> list[OrderSummaryResponseDTO]:
    try:
        return get_all_orders_summarized(db_session=session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{order_id}")
def get_order_by_id_endpoint(
    order_id: int, session: Session = Depends(get_session)
) -> OrderResponseDTO:
    try:
        return get_order_by_id(db_session=session, order_id=order_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_all_orders_endpoint(
    session: Session = Depends(get_session),
) -> list[OrderResponseDTO]:
    try:
        return get_all_orders(db_session=session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
def create_new_order_endpoint(
    request: AddOrderDTO, session: Session = Depends(get_session)
) -> OrderResponseDTO:
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
def update_order_endpoint(
    order_id: int,
    request: UpdateOrderDTO,
    session: Session = Depends(get_session),
) -> OrderResponseDTO:
    try:
        return update_order_products(
            db_session=session, order_id=order_id, products=request.products
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
