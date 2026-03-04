import { createHashRouter, Navigate } from "react-router-dom";
import OrdersPage from "./pages/orders/page";
import AddOrderPage from "./pages/add-order/page";
import ProductsPage from "./pages/products/page";

/* 

2 views, each one with its own route
o My orders → /my-orders
o Add/Edit order → /add-order/:id

*/
export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/my-orders" replace />,
  },
  {
    path: "/my-orders",
    element: <OrdersPage />,
  },
  {
    path: "/add-order",
    element: <Navigate to="/add-order/new" replace />,
  },
  {
    path: "/add-order/:id",
    element: <AddOrderPage />,
  },
  // extra
  {
    path: "/products",
    element: <Navigate to="/products/list" replace />,
  },
  {
    path: "/products/list",
    element: <ProductsPage />,
  },
  {
    path: "/products/:id",
    element: <ProductsPage />,
  },
  // 404
  {
    path: "*",
    element: <Navigate to="/my-orders" replace />,
  },
]);
