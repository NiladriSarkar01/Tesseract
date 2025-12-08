import React from "react";
import { AlertTriangle, X } from "lucide-react"; // Assuming lucide-react for icons

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-red-100 transform transition-all scale-100">
        {/* Header with Icon */}
        <div className="p-6 pb-0 flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-full shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Take Action?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to take this action? This action cannot be
              undone.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-500/30"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
