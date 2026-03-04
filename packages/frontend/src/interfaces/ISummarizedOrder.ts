// ▪ Columns: ID,Order #, date, # Products, Final price, Options

export default interface ISummarizedOrder {
  readonly id: number;
  readonly code: string;
  readonly orderDate: string;
  readonly productsCount: number;
  readonly finalPrice: string;
}
