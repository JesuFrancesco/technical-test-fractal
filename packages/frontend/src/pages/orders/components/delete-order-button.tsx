import { useCallback, useState } from "react";
import { deleteOrderById } from "../../../services/order.service";

type DeleteOrderButtonProps = {
  id: number;
};

export default function DeleteOrderButton({ id }: DeleteOrderButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteOrder = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await deleteOrderById(id);
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {/* Modal */}
      {showDeleteAlert && (
        <div className="dialog animate-fadeIn">
          <div className="dialog-content animate-scaleIn">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Confirm deletion
            </h2>

            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this order? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteOrder(id)}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 transition-all duration-200 text-white shadow-md disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setShowDeleteAlert(true)}
        className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 hover:underline"
      >
        Delete
      </button>
    </>
  );
}
