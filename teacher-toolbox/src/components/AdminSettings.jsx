// src/components/AdminSettings.jsx
import React from 'react';

const AdminSettings = ({ setCurrentPage, students, newStudentName, setNewStudentName, addStudent, removeStudent, newStudentNameRef }) => {
  const handleEnterKey = (event, actionFunction) => {
    if (event.key === 'Enter') {
      actionFunction();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Settings</h2>
      <p className="text-gray-600 mb-4">
        Manage your students here. This list will be used across all other features.
      </p>

      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Manage Students</h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => { setNewStudentName(e.target.value); }}
            onKeyDown={(e) => handleEnterKey(e, addStudent)}
            placeholder="Enter student name"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={newStudentNameRef}
            autoFocus
          />
          <button
            onClick={addStudent}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-r-lg shadow-md transition duration-300 ease-in-out"
          >
            Add Student
          </button>
        </div>
        {students.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {students.map((student) => (
              <li key={student.id} className="flex flex-col items-start justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between w-full items-center">
                  <span className="text-gray-800 font-medium">{student.name}</span>
                  <button
                    onClick={() => removeStudent(student.id)}
                    className="text-red-500 hover:text-red-700 text-lg transition duration-200"
                    title="Remove student"
                  >
                    <i className="fas fa-times-circle"></i>
                  </button>
                </div>
                <span className="text-gray-600 text-xs mt-1 break-all">Barcode: {student.barcode}</span>
                <span className="text-gray-700 text-sm mt-1">PIN: {student.pin}</span>
                <span className="text-gray-700 text-sm mt-1">Points: {student.points}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No students added yet. Add some to get started!</p>
        )}
      </div>

      <button
        onClick={() => setCurrentPage('print-ids')}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        <i className="fas fa-print mr-2"></i> Print Student IDs
      </button>

      <button
        onClick={() => setCurrentPage('dashboard')}
        className="mt-8 ml-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default AdminSettings;