// src/components/CustomModal.jsx
import React from 'react';

const CustomModal = ({ title, message, onClose }) => {
  if (!message) return null; // Only render if there's a message
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6 break-words">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
