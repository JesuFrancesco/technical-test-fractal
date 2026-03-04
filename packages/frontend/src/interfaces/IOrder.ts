import type IProduct from "./IProduct";

export default interface IOrder {
  readonly id: number;
  readonly code: string;
  readonly orderDate: string;
  readonly status: number;
  readonly orderItems: {
    product: IProduct;
    quantity: number;
  }[];
}
