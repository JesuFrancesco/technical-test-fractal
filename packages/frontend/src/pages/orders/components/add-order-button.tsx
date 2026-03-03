import { useNavigate } from "react-router-dom";

export default function AddOrderButton() {
  const router = useNavigate();
  return <button onClick={() => router("/add-order")}>Add new order</button>;
}
