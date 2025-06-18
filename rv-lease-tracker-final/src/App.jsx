import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import RVDetail from './pages/RVDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/rv/:id" element={<RVDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

