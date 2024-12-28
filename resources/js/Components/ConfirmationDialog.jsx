import React from "react";

export default function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    message,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-xl text-black font-bold mb-4 text-center">
                    Confirm Action
                </h2>
                <p className="text-gray-700 mb-6 text-center">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
