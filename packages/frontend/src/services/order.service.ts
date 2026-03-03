import type IOrder from "../interfaces/order";
// import api from "./api";

export const getOrderData = async () => {
  // const response = await api.get<IOrder[]>("/orders");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: IOrder[] = [
    {
      id: 1,
      orderNumber: "ORD-1001",
      date: "2026-03-01",
      productsCount: 3,
      finalPrice: 149.99,
    },
    {
      id: 2,
      orderNumber: "ORD-1002",
      date: "2026-03-02",
      productsCount: 1,
      finalPrice: 49.5,
    },
    {
      id: 3,
      orderNumber: "ORD-1003",
      date: "2026-03-02",
      productsCount: 5,
      finalPrice: 320.0,
    },
    {
      id: 4,
      orderNumber: "ORD-1004",
      date: "2026-03-03",
      productsCount: 2,
      finalPrice: 89.9,
    },
  ];
  return data;
};
