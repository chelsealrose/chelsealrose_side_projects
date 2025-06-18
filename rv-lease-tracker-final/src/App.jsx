import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import RVManager from './components/RVManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/rv/:id" element={<RVManager />} />
        <Route path="/rv" element={<RVManager />} /> {/* For ?name= */}
      </Routes>
    </Router>
  );
}

export default App;


