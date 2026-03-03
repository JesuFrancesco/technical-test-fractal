import OrderTable from "./components/order-table";
import AddOrderButton from "./components/add-order-button";
import { Helmet } from "react-helmet-async";

/*
o Title, “My Orders”
o Table to show the orders created
    ▪ Columns: ID, Order #, date, # Products, Final price, Options
    ▪ The options perrow are:
    • Edit Order: Redirect to theAdd/Edit Order view (sending the ID)
    • Delete Order: Show a confirmationmodal and delete the order
o Button to add a new order, this will redirect to the Add/Edit Order view

*/

export default function OrdersPage() {
  return (
    <>
      <Helmet>
        <title>My Orders</title>
        <meta name="description" content="View and manage your orders" />
      </Helmet>
      <main>
        <h1>My Orders</h1>
        <section className="flex flex-col gap-2">
          <OrderTable />
          <AddOrderButton />
        </section>
      </main>
    </>
  );
}
