import { useCallback, useState } from "react";
import { deleteOrderById } from "../../../services/order.service";

type DeleteOrderButtonProps = {
  id: number;
  onDeleteSuccess?: () => void;
};

export default function DeleteOrderButton({
  id,
  onDeleteSuccess,
}: DeleteOrderButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteOrder = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await deleteOrderById(id);
      if (onDeleteSuccess) onDeleteSuccess();
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
                className="button-cancel"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteOrder(id)}
                disabled={loading}
                className="button-destroy"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <div>
        <button
          onClick={() => setShowDeleteAlert(true)}
          className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 hover:underline"
        >
          Delete
        </button>
      </div>
    </>
  );
}
