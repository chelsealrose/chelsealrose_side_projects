import React, { useState, useRef } from 'react';

const QuestionGenerator = ({ setCurrentPage }) => {
  const [questionGrade, setQuestionGrade] = useState('1');
  const [questionTopic, setQuestionTopic] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionError, setQuestionError] = useState(null);
  const questionTopicRef = useRef(null);

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateQuestion();
    }
  };

  const generateQuestion = () => {
    if (!questionTopic.trim()) {
      setQuestionError('Please enter a topic.');
      questionTopicRef.current?.focus();
      return;
    }
    setQuestionLoading(true);
    setQuestionError(null);
    setShowQuestionAnswer(false);

    // Simulate async question generation
    setTimeout(() => {
      setGeneratedQuestion(`Example question about "${questionTopic}" for grade ${questionGrade}.`);
      setGeneratedAnswer(`Example answer for topic "${questionTopic}" at grade ${questionGrade}.`);
      setQuestionLoading(false);
    }, 1200);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
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
              onChange={(e) => setQuestionTopic(e.target.value)}
              onKeyDown={handleEnterKey}
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

export default QuestionGenerator;
