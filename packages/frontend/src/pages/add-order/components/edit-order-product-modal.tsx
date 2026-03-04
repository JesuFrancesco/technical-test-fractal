import { useEffect, useState } from "react";
import type IOrderProduct from "../../../interfaces/IOrderProduct";

type EditOrderProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  index: number | null;
  orderProduct: IOrderProduct | null;
  handleEditProduct: (index: number, updated: IOrderProduct) => void;
};

export default function EditOrderProductModal({
  isOpen,
  onClose,
  index,
  orderProduct,
  handleEditProduct,
}: EditOrderProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (orderProduct) {
      setQuantity(orderProduct.quantity);
    }
  }, [orderProduct]);

  if (!isOpen || !orderProduct) return null;

  const total = Number(orderProduct.product.price) * Number(quantity);

  const handleSave = () => {
    if (index === null) return;

    handleEditProduct(index, {
      ...orderProduct,
      quantity,
    });

    onClose();
  };

  return (
    <div className="dialog animate-fadeIn">
      <div className="dialog-content animate-scaleIn flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Product</label>
            <div className="font-medium">{orderProduct.product.name}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Unit Price</label>
            <div>${orderProduct.product.price}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Total</label>
            <div className="font-semibold">${total.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl button-cancel hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl button-primary hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
