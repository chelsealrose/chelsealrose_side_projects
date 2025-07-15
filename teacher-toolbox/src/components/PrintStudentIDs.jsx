// src/components/PrintStudentIDs.jsx
import React from 'react';

const PrintStudentIDs = ({ setCurrentPage, students }) => {
  const printStudentList = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Student IDs</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; margin: 20px; }
      .id-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        margin: 10px;
        display: inline-block;
        width: 280px; /* Adjust as needed for card size */
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        vertical-align: top;
      }
      .id-card h3 { margin-top: 0; margin-bottom: 5px; color: #333; }
      .id-card p { margin: 3px 0; font-size: 0.9em; color: #555; word-break: break-all; }
      .id-card .barcode-label { font-weight: bold; margin-top: 8px; }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Student ID Cards</h1>');
    printWindow.document.write('<p>Cut along the lines to create individual student ID cards.</p><hr/>');

    students.forEach(student => {
      printWindow.document.write(`
        <div class="id-card">
          <h3>${student.name}</h3>
          <p class="barcode-label">Barcode:</p>
          <p>${student.barcode}</p>
          <p class="barcode-label">PIN:</p>
          <p>${student.pin}</p>
        </div>
      `);
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Print Student IDs</h2>
      <p className="text-gray-600 mb-4">
        Generate a printable list of student names, barcodes, and PINs for creating ID cards.
      </p>

      {students.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Student List for Printing:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {students.map(student => (
              <div key={student.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-600 break-all">Barcode: {student.barcode}</p>
                <p className="text-sm text-gray-600">PIN: {student.pin}</p>
              </div>
            ))}
          </div>
          <button
            onClick={printStudentList}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            <i className="fas fa-print mr-2"></i> Print All IDs
          </button>
        </div>
      ) : (
        <p className="text-gray-500 italic">No students added yet. Add students in Admin Settings to generate IDs.</p>
      )}

      <button
        onClick={() => setCurrentPage('admin-settings')}
        className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Back to Admin Settings
      </button>
    </div>
  );
};

export default PrintStudentIDs;