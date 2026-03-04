import type IProduct from "./IProduct";

export default interface IOrderProduct {
  product: IProduct;
  quantity: number;
}
