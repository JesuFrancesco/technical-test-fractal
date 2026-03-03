// ▪ Columns: ID,Order #, date, # Products, Final price, Options

export default interface IOrder {
  readonly id: number;
  readonly orderNumber: string;
  readonly date: string;
  readonly productsCount: number;
  readonly finalPrice: number;
}
