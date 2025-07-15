// src/components/ExtraCreditPortal.jsx
import React from 'react';

const ExtraCreditPortal = ({ setCurrentPage, assignmentAge, setAssignmentAge, assignmentTopic, setAssignmentTopic, generatedAssignmentContent, setGeneratedAssignmentContent, generatedAssignmentAnswerKey, setGeneratedAssignmentAnswerKey, showAssignmentAnswerKey, setShowAssignmentAnswerKey, generatingAssignment, setGeneratingAssignment, assignmentGenerationError, setAssignmentGenerationError, generateAssignment, saveAssignment, printAssignment, assignmentTopicRef, handleEnterKey }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Extra Credit / Busy Work Portal</h2>
    <p className="text-gray-600 mb-4">
      Generate printable extra credit or busy work assignments for your students.
    </p>

    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Generate New Assignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="assignmentAge" className="block text-sm font-medium text-gray-700 mb-1">Grade Level:</label>
          <select
            id="assignmentAge"
            value={assignmentAge}
            onChange={(e) => setAssignmentAge(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assignmentTopic" className="block text-sm font-medium text-gray-700 mb-1">Topic:</label>
          <input
            type="text"
            id="assignmentTopic"
            value={assignmentTopic}
            onChange={(e) => { setAssignmentTopic(e.target.value); }}
            onKeyDown={(e) => handleEnterKey(e, generateAssignment)}
            placeholder="e.g., Math, Science, Art"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={assignmentTopicRef}
            autoFocus
          />
        </div>
      </div>
      <button
        onClick={generateAssignment}
        disabled={generatingAssignment || !assignmentTopic.trim()}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out ${generatingAssignment || !assignmentTopic.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {generatingAssignment ? 'Generating...' : 'Generate Assignment'}
      </button>
      {assignmentGenerationError && <p className="text-red-500 mt-3 text-center">{assignmentGenerationError}</p>}
    </div>

    {generatedAssignmentContent && (
      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">Generated Assignment:</h3>
        <div className="text-gray-800 mb-4 whitespace-pre-wrap">{generatedAssignmentContent}</div>

        <h3 className="text-xl font-semibold text-indigo-800 mb-2">Answer Key:</h3>
        {showAssignmentAnswerKey ? (
          <div className="text-gray-800 mb-4 whitespace-pre-wrap">{generatedAssignmentAnswerKey}</div>
        ) : (
          <button
            onClick={() => setShowAssignmentAnswerKey(true)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
          >
            Show Answer Key
          </button>
        )}

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => printAssignment(generatedAssignmentContent, generatedAssignmentAnswerKey, assignmentTopic, assignmentAge)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Print Assignment
          </button>
          <button
            onClick={saveAssignment}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Save Assignment
          </button>
        </div>
      </div>
    )}

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </button>
  </div>
);

export default ExtraCreditPortal;