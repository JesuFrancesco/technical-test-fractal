import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrderById,
  createOrder,
  updateOrder,
} from "../../services/order.service";
import type IOrderProduct from "../../interfaces/IOrderProduct";
import OrderProductsTable from "./components/order-products-table";
import AddOrderProductTable from "./components/add-order-product-table";
import Loader from "../../ui/icons/Loader";

export default function AddOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = id !== "new";

  const [orderDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [orderProducts, setOrderProducts] = useState<IOrderProduct[]>([]);

  const [loading, setLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // -----------------------------
  // Computed values
  // -----------------------------
  const finalPrice = useMemo(() => {
    return orderProducts.reduce(
      (sum, p) => sum + Number.parseFloat(p.product.price) * p.quantity,
      0,
    );
  }, [orderProducts]);

  // -----------------------------
  // Load order if editing
  // -----------------------------
  const getOrderData = useCallback(async () => {
    if (!isEditMode) return;

    try {
      setLoading(true);
      const order = await getOrderById(Number(id));

      setOrderProducts(order.orderItems);
    } finally {
      setLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  // -----------------------------
  // Add product
  // -----------------------------
  const handleAddProduct = (product: IOrderProduct) => {
    setOrderProducts((prev) => [...prev, product]);
  };

  // -----------------------------
  // Edit product
  // -----------------------------
  const handleEditProduct = (index: number, updated: IOrderProduct) => {
    setOrderProducts((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  // -----------------------------
  // Remove product
  // -----------------------------
  const handleRemoveProduct = (index: number) => {
    setOrderProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // -----------------------------
  // Save Order
  // -----------------------------
  const handleSave = async () => {
    try {
      setLoading(true);

      const orderProductsDTO = orderProducts.map((op) => ({
        productId: op.product.id,
        quantity: op.quantity,
      }));

      if (isEditMode) {
        await updateOrder(Number(id), { products: orderProductsDTO });
      } else {
        await createOrder({ products: orderProductsDTO });
      }

      navigate("/my-orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Order" : "Add Order"}
      </h1>

      {/* Order Info */}
      <section className="mb-6 space-y-3 w-1/3 flex flex-col justify-center gap-2 border p-4 rounded">
        <div className="flex gap-2">
          <label>Date</label>
          <input type="text" value={orderDate} disabled />
        </div>

        <div className="flex gap-2">
          <label># Products</label>
          <input type="text" value={orderProducts.length} disabled />
        </div>

        <div className="flex gap-2">
          <label>Final Price</label>
          <input type="text" value={finalPrice.toFixed(2)} disabled />
        </div>
      </section>

      {/* Handle add product */}
      {showAddProduct && (
        <div className="dialog animate-fadeIn">
          <div className="dialog-content animate-scaleIn flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Add Product
            </h2>

            <AddOrderProductTable
              selectedProducts={orderProducts}
              onRowClick={handleAddProduct}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddProduct(false)}
                className="button-cancel"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowAddProduct(true)}
        className="button-primary w-fit self-end"
      >
        (+) Add Product
      </button>

      {/* Product Table */}
      <OrderProductsTable
        orderProducts={orderProducts}
        handleEditProduct={handleEditProduct}
        handleRemoveProduct={handleRemoveProduct}
      />

      {/* Save Button */}

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="h-12 animate-spin stroke-dusty-denim" />
        </div>
      ) : (
        <></>
      )}

      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={() => navigate("/my-orders")}
          className="button-cancel"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleSave}
          className="button-primary"
        >
          {isEditMode ? "Update Order" : "Add Order"}
        </button>
      </div>
    </main>
  );
}
