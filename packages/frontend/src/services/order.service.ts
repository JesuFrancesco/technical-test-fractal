import type { CreateOrderDTO } from "../interfaces/dto/create-order";
import type IOrder from "../interfaces/IOrder";
import type ISummarizedOrder from "../interfaces/ISummarizedOrder";
import api from "./api";

export const getAllOrders = async () => {
  const response = await api.get<ISummarizedOrder[]>("/orders/summarized");
  return response.data;
};

export const getOrderById = async (id: number) => {
  const response = await api.get<IOrder>(`/orders/${id}`);
  console.log(response.data);

  return response.data;
};

export const deleteOrderById = async (id: number) => {
  const response = await api.delete<null>(`/orders/${id}`);
  return response.data;
};
export const createOrder = async (order: CreateOrderDTO) => {
  const response = await api.post<IOrder>("/orders", order);
  return response.data;
};
export const updateOrder = async (id: number, order: CreateOrderDTO) => {
  const response = await api.put<IOrder>(`/orders/${id}`, order);
  return response.data;
};
