import type React from "react";
import { getOrderData } from "../../../services/order.service";
import { useCallback, useEffect, useState } from "react";
import type IOrder from "../../../interfaces/order";
import ReactTable from "../../../ui/react-table";
import Loader from "../../../ui/icons/Loader";
import { useNavigate } from "react-router";
import DeleteOrderButton from "./delete-order-button";

type OrderTableProps = React.ComponentPropsWithoutRef<"table">;

export default function OrderTable(props: OrderTableProps) {
  const router = useNavigate();
  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrderData();
      setData(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ID, Order #, date, # Products, Final price, Options
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "code",
      header: "Order #",
    },
    {
      accessorKey: "orderDate",
      header: "Date",
    },
    {
      accessorKey: "productsCount",
      header: "# Products",
    },
    {
      accessorKey: "finalPrice",
      header: "Final Price",
    },
    {
      id: "options",
      header: "Options",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => router(`/add-order/${row.original.id}`)}
            className="text-blue-500"
          >
            Edit
          </button>
          <DeleteOrderButton id={row.original.id} />
          {/* <button
            onClick={() => handleOnDelete(row.original.id)}
            className="text-red-500"
          >
            Delete
          </button> */}
        </div>
      ),
    },
  ];

  return loading ? (
    <div className="flex justify-center items-center">
      <Loader className="h-12 animate-spin stroke-dusty-denim" />
    </div>
  ) : (
    <ReactTable columns={columns} data={data} {...props} />
  );
}
