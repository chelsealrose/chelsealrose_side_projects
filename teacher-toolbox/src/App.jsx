import React, { useState, useRef } from 'react';

// Dashboard Component
const Dashboard = ({ setCurrentPage }) => (
  <div className="p-6 max-w-4xl w-full bg-white rounded-lg shadow-lg text-center">
    <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
    <button
      onClick={() => setCurrentPage('rewards')}
      className="btn-primary mb-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      View Rewards
    </button>
    <button
      onClick={() => setCurrentPage('assignments')}
      className="btn-primary mb-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
    >
      Extra Credit Portal
    </button>
    <button
      onClick={() => setCurrentPage('question-generator')}
      className="btn-primary mb-4 px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 ml-4"
    >
      Question Generator
    </button>
  </div>
);

// RewardInventory Component
const RewardInventory = ({ rewardItems, setCurrentPage }) => (
  <div className="mt-6 max-w-4xl w-full">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Reward Inventory</h3>
    {rewardItems.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="table-header px-4 py-2">Item Name</th>
              <th className="table-header px-4 py-2">Point Cost</th>
              <th className="table-header px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {rewardItems.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="table-cell px-4 py-2">{item.name}</td>
                <td className="table-cell px-4 py-2">{item.cost}</td>
                <td className="table-cell px-4 py-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500 italic">No reward items in inventory yet. Add some!</p>
    )}

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="btn-secondary mt-8 px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Back to Dashboard
    </button>
  </div>
);

// ExtraCreditPortal Component
const ExtraCreditPortal = ({
  setCurrentPage,
  assignmentAge,
  setAssignmentAge,
  assignmentTopic,
  setAssignmentTopic,
  generatedAssignmentContent,
  setGeneratedAssignmentContent,
  generatedAssignmentAnswerKey,
  setGeneratedAssignmentAnswerKey,
  showAssignmentAnswerKey,
  setShowAssignmentAnswerKey,
  generatingAssignment,
  setGeneratingAssignment,
  assignmentGenerationError,
  setAssignmentGenerationError,
  generateAssignment,
  assignmentTopicRef,
}) => (
  <div className="p-6 max-w-4xl w-full bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Extra Credit / Busy Work Portal</h2>
    <p className="text-gray-600 mb-4">Generate printable extra credit or busy work assignments for your students.</p>

    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Generate New Assignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="assignmentAge" className="block text-sm font-medium text-gray-700 mb-1">Grade Level:</label>
          <select
            id="assignmentAge"
            value={assignmentAge}
            onChange={(e) => setAssignmentAge(e.target.value)}
            className="input-field border border-gray-300 rounded px-3 py-2 w-full"
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
            onChange={(e) => setAssignmentTopic(e.target.value)}
            placeholder="e.g., Math, Science, Art"
            className="input-field border border-gray-300 rounded px-3 py-2 w-full"
            ref={assignmentTopicRef}
            autoFocus
          />
        </div>
      </div>
      <button
        onClick={generateAssignment}
        disabled={generatingAssignment || !assignmentTopic.trim()}
        className={`btn-primary w-full py-2 rounded text-white ${generatingAssignment || !assignmentTopic.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
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
          <button onClick={() => setShowAssignmentAnswerKey(true)} className="btn-secondary mb-4 px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-100">
            Show Answer Key
          </button>
        )}
      </div>
    )}

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="btn-secondary mt-8 px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Back to Dashboard
    </button>
  </div>
);

// QuestionGenerator Component
const QuestionGenerator = ({
  setCurrentPage,
  questionGrade,
  setQuestionGrade,
  questionTopic,
  setQuestionTopic,
  generatedQuestion,
  setGeneratedQuestion,
  generatedAnswer,
  setGeneratedAnswer,
  showQuestionAnswer,
  setShowQuestionAnswer,
  questionLoading,
  setQuestionLoading,
  questionError,
  setQuestionError,
  generateQuestion,
  questionTopicRef,
  handleEnterKey
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Random Question Generator</h2>
      <p className="text-gray-600 mb-4">
        Generate questions and answers for different grades and topics using AI.
      </p>

      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Generate New Question</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="questionGrade" className="block text-sm font-medium text-gray-700 mb-1">Grade Level:</label>
            <select
              id="questionGrade"
              value={questionGrade}
              onChange={(e) => setQuestionGrade(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="questionTopic" className="block text-sm font-medium text-gray-700 mb-1">Topic:</label>
            <input
              type="text"
              id="questionTopic"
              value={questionTopic}
              onChange={(e) => { setQuestionTopic(e.target.value); }}
              onKeyDown={(e) => handleEnterKey(e, generateQuestion)}
              placeholder="e.g., Algebra, History, Biology"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={questionTopicRef}
              autoFocus
            />
          </div>
        </div>
        <button
          onClick={generateQuestion}
          disabled={questionLoading || !questionTopic.trim()}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out ${questionLoading || !questionTopic.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {questionLoading ? 'Generating...' : 'Generate Question'}
        </button>
        {questionError && <p className="text-red-500 mt-3 text-center">{questionError}</p>}
      </div>

      {generatedQuestion && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Generated Question:</h3>
          <p className="text-gray-800 mb-4">{generatedQuestion}</p>
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Answer:</h3>
          {showQuestionAnswer ? (
            <p className="text-gray-800">{generatedAnswer}</p>
          ) : (
            <button
              onClick={() => setShowQuestionAnswer(true)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Show Answer
            </button>
          )}
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
};

// Main App Component
const App = () => {
  // Current page state, saved in localStorage
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('currentPage') || 'dashboard');
  React.useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Reward inventory state
  const [rewardItems] = useState([
    { id: 1, name: 'Pencil', cost: 10, quantity: 100 },
    { id: 2, name: 'Notebook', cost: 25, quantity: 50 },
  ]);

  // Extra Credit Portal state
  const [assignmentAge, setAssignmentAge] = useState(1);
  const [assignmentTopic, setAssignmentTopic] = useState('');
  const [generatedAssignmentContent, setGeneratedAssignmentContent] = useState('');
  const [generatedAssignmentAnswerKey, setGeneratedAssignmentAnswerKey] = useState('');
  const [showAssignmentAnswerKey, setShowAssignmentAnswerKey] = useState(false);
  const [generatingAssignment, setGeneratingAssignment] = useState(false);
  const [assignmentGenerationError, setAssignmentGenerationError] = useState(null);
  const assignmentTopicRef = useRef(null);

  const generateAssignment = () => {
    if (!assignmentTopic.trim()) {
      setAssignmentGenerationError('Please enter a topic.');
      return;
    }
    setGeneratingAssignment(true);
    setAssignmentGenerationError(null);

    setTimeout(() => {
      setGeneratedAssignmentContent(`Generated assignment on "${assignmentTopic}" for grade ${assignmentAge}.`);
      setGeneratedAssignmentAnswerKey(`Answer key for topic: ${assignmentTopic}.`);
      setShowAssignmentAnswerKey(false);
      setGeneratingAssignment(false);
    }, 1200);
  };

  // Question Generator state
  const [questionGrade, setQuestionGrade] = useState(1);
  const [questionTopic, setQuestionTopic] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionError, setQuestionError] = useState(null);
  const questionTopicRef = useRef(null);

  const handleEnterKey = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  const generateQuestion = () => {
    if (!questionTopic.trim()) {
      setQuestionError('Please enter a topic.');
      return;
    }
    setQuestionLoading(true);
    setQuestionError(null);

    setTimeout(() => {
      setGeneratedQuestion(`Generated question on "${questionTopic}" for grade ${questionGrade}.`);
      setGeneratedAnswer(`Correct answer for topic: ${questionTopic}.`);
      setShowQuestionAnswer(false);
      setQuestionLoading(false);
    }, 1200);
  };

  // Render page switch
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'rewards':
        return <RewardInventory rewardItems={rewardItems} setCurrentPage={setCurrentPage} />;
      case 'assignments':
        return (
          <ExtraCreditPortal
            setCurrentPage={setCurrentPage}
            assignmentAge={assignmentAge}
            setAssignmentAge={setAssignmentAge}
            assignmentTopic={assignmentTopic}
            setAssignmentTopic={setAssignmentTopic}
            generatedAssignmentContent={generatedAssignmentContent}
            setGeneratedAssignmentContent={setGeneratedAssignmentContent}
            generatedAssignmentAnswerKey={generatedAssignmentAnswerKey}
            setGeneratedAssignmentAnswerKey={setGeneratedAssignmentAnswerKey}
            showAssignmentAnswerKey={showAssignmentAnswerKey}
            setShowAssignmentAnswerKey={setShowAssignmentAnswerKey}
            generatingAssignment={generatingAssignment}
            setGeneratingAssignment={setGeneratingAssignment}
            assignmentGenerationError={assignmentGenerationError}
            setAssignmentGenerationError={setAssignmentGenerationError}
            generateAssignment={generateAssignment}
            assignmentTopicRef={assignmentTopicRef}
          />
        );
      case 'question-generator':
        return (
          <QuestionGenerator
            setCurrentPage={setCurrentPage}
            questionGrade={questionGrade}
            setQuestionGrade={setQuestionGrade}
            questionTopic={questionTopic}
            setQuestionTopic={setQuestionTopic}
            generatedQuestion={generatedQuestion}
            setGeneratedQuestion={setGeneratedQuestion}
            generatedAnswer={generatedAnswer}
            setGeneratedAnswer={setGeneratedAnswer}
            showQuestionAnswer={showQuestionAnswer}
            setShowQuestionAnswer={setShowQuestionAnswer}
            questionLoading={questionLoading}
            setQuestionLoading={setQuestionLoading}
            questionError={questionError}
            setQuestionError={setQuestionError}
            generateQuestion={generateQuestion}
            questionTopicRef={questionTopicRef}
            handleEnterKey={handleEnterKey}
          />
        );
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans antialiased">
      {renderPage()}
    </div>
  );
};

export default App;

