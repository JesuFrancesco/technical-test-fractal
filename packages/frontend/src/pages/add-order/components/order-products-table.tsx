import type React from "react";
import { useState } from "react";
import ReactTable from "../../../ui/react-table";
import Loader from "../../../ui/icons/Loader";
import type IOrderProduct from "../../../interfaces/IOrderProduct";
import EditOrderProductModal from "./edit-order-product-modal";
// import { useNavigate } from "react-router";

type OrderTableProps = React.ComponentPropsWithoutRef<"table"> & {
  orderProducts: IOrderProduct[];
  handleEditProduct: (index: number, updated: IOrderProduct) => void;
  handleRemoveProduct: (index: number) => void;
};

export default function OrderProductsTable({
  orderProducts,
  handleEditProduct,
  handleRemoveProduct,
  ...props
}: OrderTableProps) {
  //   const router = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // ID, Order #, date, # Products, Final price, Options
  const columns = [
    {
      accessorKey: "product.id",
      header: "ID",
    },
    {
      accessorKey: "product.name",
      header: "Name",
    },
    {
      accessorKey: "product.price",
      header: "Unit Price",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
    },
    {
      id: "totalPrice",
      header: "Total Price",
      accessorFn: (row: any) => {
        return (Number.parseFloat(row.product.price) * row.quantity).toFixed(2);
      },
    },
    {
      id: "options",
      header: "Options",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="text-blue-500"
          >
            Edit
          </button>
          {showEditModal && (
            <EditOrderProductModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              index={row.index}
              orderProduct={row.original}
              handleEditProduct={handleEditProduct}
            />
          )}
          <button
            onClick={() => handleRemoveProduct(row.index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return loading ? (
    <div className="flex justify-center items-center">
      <Loader className="h-12 animate-spin stroke-dusty-denim" />
    </div>
  ) : (
    <ReactTable columns={columns} data={orderProducts} {...props} />
  );
}
