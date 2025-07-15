// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({ setCurrentPage, userId }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Teacher!</h2>
    <p className="text-gray-600 mb-8">Manage your classroom with ease using the tools below.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <button
        onClick={() => setCurrentPage('admin-settings')}
        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-cog mr-3"></i> Admin Settings
      </button>
      <button
        onClick={() => setCurrentPage('library')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-book mr-3"></i> In-Class Library
      </button>
      <button
        onClick={() => setCurrentPage('selector')}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-users mr-3"></i> Random Child Selector
      </button>
      <button
        onClick={() => setCurrentPage('rewards')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-star mr-3"></i> Reward System
      </button>
      <button
        onClick={() => setCurrentPage('assignments')}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-clipboard-list mr-3"></i> Extra Credit/Busy Work
      </button>
      <button
        onClick={() => setCurrentPage('saved-assignments')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-save mr-3"></i> Saved Assignments
      </button>
      <button
        onClick={() => setCurrentPage('questions')}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <i className="fas fa-question-circle mr-3"></i> Question Generator
      </button>
    </div>
    {userId && (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-gray-700 text-sm">
        Your User ID: <span className="font-mono break-all">{userId}</span>
      </div>
    )}
  </div>
);

export default Dashboard;