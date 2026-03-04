import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactTable from "../../../ui/react-table";
import Loader from "../../../ui/icons/Loader";
import { getAllProducts } from "../../../services/product.service";
import type IProduct from "../../../interfaces/IProduct";
import type IOrderProduct from "../../../interfaces/IOrderProduct";

type OrderTableProps = React.ComponentPropsWithoutRef<"table"> & {
  onRowClick: (product: IOrderProduct) => void;
  selectedProducts: IOrderProduct[];
};

export default function AddOrderProductTable({
  onRowClick,
  selectedProducts,
  ...props
}: OrderTableProps) {
  const [data, setData] = useState<IProduct[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setData(response);

      const initialQuantities: Record<number, number> = {};
      response.forEach((product) => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value < 1 ? 1 : value,
    }));
  };

  const filteredData = useMemo(() => {
    const selectedIds = new Set(selectedProducts.map((op) => op.product.id));

    return data.filter((product) => !selectedIds.has(product.id));
  }, [data, selectedProducts]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      id: "quantity",
      header: "Qty",
      cell: ({ row }: { row: any }) => {
        const productId = row.original.id;

        return (
          <div className="flex items-center justify-center">
            <input
              type="number"
              min={1}
              value={quantities[productId] ?? 1}
              onChange={(e) =>
                handleQuantityChange(productId, Number(e.target.value))
              }
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>
        );
      },
    },
    {
      id: "options",
      header: "",
      cell: ({ row }: { row: any }) => {
        const productId = row.original.id;

        return (
          <div className="flex items-center justify-center">
            <button
              onClick={() =>
                onRowClick({
                  product: row.original,
                  quantity: quantities[productId] ?? 1,
                })
              }
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Add
            </button>
          </div>
        );
      },
    },
  ];

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="flex justify-center items-center">
        No products available to add.
      </div>
    );
  }

  return loading ? (
    <div className="flex justify-center items-center">
      <Loader className="h-12 animate-spin stroke-dusty-denim" />
    </div>
  ) : (
    <ReactTable columns={columns} data={filteredData} {...props} />
  );
}
