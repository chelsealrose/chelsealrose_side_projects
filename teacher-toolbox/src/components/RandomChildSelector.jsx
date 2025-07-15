// src/components/RandomChildSelector.jsx
import React from 'react';

const RandomChildSelector = ({ setCurrentPage, students, selectedStudents, countdown, pickingStudent, currentPickedStudent, startPickingStudent, resetPickedStudents }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Random Child Selector</h2>
    <p className="text-gray-600 mb-4">
      This tool will pick a random student from your class list, and won't pick them again until everyone has had a turn.
      Manage students in <span className="font-semibold text-gray-700">Admin Settings</span>.
    </p>

    <div className="text-center mt-8">
      {pickingStudent ? (
        <div className="text-5xl font-extrabold text-blue-600 animate-pulse">
          {countdown > 0 ? countdown : 'Picking...'}
        </div>
      ) : (
        <>
          {currentPickedStudent && (
            <div className="text-4xl font-extrabold text-green-700 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-inner animate-bounce">
              {currentPickedStudent}
            </div>
          )}
          <button
            onClick={startPickingStudent}
            disabled={students.length === 0}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${students.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Pick Random Student
          </button>
          {students.length > 0 && selectedStudents.length < students.length && (
            <button
              onClick={resetPickedStudents}
              className="ml-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Reset All Students
            </button>
          )}
          {selectedStudents.length > 0 && (
            <p className="mt-4 text-gray-600">
              Students remaining for this round: <span className="font-bold">{selectedStudents.length}</span>
            </p>
          )}
        </>
      )}
    </div>

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </button>
  </div>
);

export default RandomChildSelector;