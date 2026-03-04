from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_session
from services.products import (
    get_all_products,
    create_product,
    get_product_by_id,
    update_product,
    delete_product,
)
from schema.products import AddProductDTO, ProductResponseDTO, UpdateProductDTO

router = APIRouter(
    prefix="/products",
    tags=["products"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/{product_id}")
def get_product_by_id_endpoint(
    product_id: int, session: Session = Depends(get_session)
) -> ProductResponseDTO:
    try:
        return get_product_by_id(db_session=session, product_id=product_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_all_products_endpoint(
    session: Session = Depends(get_session),
) -> list[ProductResponseDTO]:
    try:
        return get_all_products(db_session=session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
def create_new_product_endpoint(
    request: AddProductDTO, session: Session = Depends(get_session)
) -> ProductResponseDTO:
    try:
        return create_product(
            db_session=session,
            name=request.name,
            price=request.price,
            stock=request.stock,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{product_id}")
def update_product_endpoint(
    request: UpdateProductDTO,
    product_id: str,
    session: Session = Depends(get_session),
) -> ProductResponseDTO:
    try:
        print(request)
        return update_product(
            db_session=session,
            product_id=product_id,
            price=request.price,
            name=request.name,
            stock=request.stock,
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{product_id}")
def delete_product_endpoint(
    product_id: str, session: Session = Depends(get_session)
) -> None:
    try:
        return delete_product(db_session=session, product_id=int(product_id))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
