import React, { useState } from "react";

export default function CreateDialogCategory({
    isOpen,
    onClose,
    onConfirm,
    message,
}) {
    const [categoryName, setCategoryName] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(categoryName); // send value to parent component
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-xl text-black font-bold mb-4 text-center">
                    {message}
                </h2>
                <div className="">
                    <div className="form">
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
