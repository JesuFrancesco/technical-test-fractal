import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type React from "react";
import { getOrderData } from "../../../services/order.service";
import { useCallback, useEffect, useState } from "react";
import type IOrder from "../../../interfaces/order";

type OrderTableProps = React.ComponentPropsWithoutRef<"table">;

export default function OrderTable(props: OrderTableProps) {
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
      accessorKey: "orderNumber",
      header: "Order #",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "productsCount",
      header: "# Products",
    },
    {
      accessorKey: "finalPrice",
      header: "Final Price",
      cell: ({ row }: any) => `$${row.original.finalPrice.toFixed(2)}`,
    },
    {
      id: "options",
      header: "Options",
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="text-blue-500">Edit</button>
          <button className="text-red-500">Delete</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table {...props}>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
