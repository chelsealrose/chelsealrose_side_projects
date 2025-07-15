// src/components/SavedAssignments.jsx
import React from 'react';

const SavedAssignments = ({ setCurrentPage, savedAssignments, printAssignment, deleteSavedAssignment }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Assignments</h2>
    <p className="text-gray-600 mb-4">
      Here you can find all the assignments you have saved.
    </p>

    {savedAssignments.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedAssignments.map(assignment => (
          <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.topic} (Grade {assignment.age})</h3>
              <p className="text-sm text-gray-600 mb-3">Saved: {new Date(assignment.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700 line-clamp-3">{assignment.content}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => printAssignment(assignment.content, assignment.answerKey, assignment.topic, assignment.age)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-3 rounded-lg text-sm shadow-md transition duration-300 ease-in-out"
              >
                Print
              </button>
              <button
                onClick={() => deleteSavedAssignment(assignment.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg text-sm shadow-md transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic">No assignments saved yet. Generate and save some from the "Extra Credit / Busy Work Portal"!</p>
    )}

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </button>
  </div>
);

export default SavedAssignments;