import type IProduct from "../interfaces/IProduct";
import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get<IProduct[]>("/products");
  console.log(response.data);

  return response.data;
};
