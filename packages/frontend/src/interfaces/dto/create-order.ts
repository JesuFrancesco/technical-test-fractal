export type CreateOrderDTO = {
  products: {
    productId: number;
    quantity: number;
  }[];
};
