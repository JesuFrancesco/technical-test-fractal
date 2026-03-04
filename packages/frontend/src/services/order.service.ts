import type IOrder from "../interfaces/order";
import api from "./api";

export const getOrderData = async () => {
  const response = await api.get<IOrder[]>("/orders/summarized");
  return response.data;
};

export const deleteOrderById = async (id: number) => {
  const response = await api.delete<IOrder[]>(`/orders/${id}`);
  return response.data;
};
