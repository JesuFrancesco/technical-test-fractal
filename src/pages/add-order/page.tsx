import { useParams } from "react-router-dom";

/*
○ Form to create/edit the order
    ▪ Order #
    ▪ Date (disabled, auto completed, current date with format)
    ▪ # Products (disabled, auto completed, count of products selected)
    ▪ Final Price (disabled, auto completed,sum of all product’s prices)
o Button to add a new product to the order, this will open a modal with a simple form
    ▪ Select to choose the product
    ▪ Input number with the qty required
    ▪ Button to confirm and save
○ Table to list the available products(3 products)
    ▪ Columns: ID, Name, Unit Price, Qty, Total Price, Options
    ▪ The options perrow are:
        • Edit product: Open a modal to edit the product added in the order (not the product general info)
        • Remove product: Show a confirmationmodal and remove the product of the order
o Button to save and create the order
    • This view must be used for “Create/Add” and “Edit”; the difference will be the exists of ID in the route params
*/

export default function AddOrderPage() {
  const { id } = useParams();

  return (
    <main>
      <h1>{id === "new" ? "Add Order" : `Edit order`}</h1>
    </main>
  );
}
