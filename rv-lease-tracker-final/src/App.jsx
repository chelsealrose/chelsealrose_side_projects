import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import RVManager from './components/RVManager';
import ClientProfilePage from "./pages/ClientProfilePage";
import ClientDirectoryPage from './pages/ClientDirectoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/rv/:id" element={<RVManager />} />
        <Route path="/rv" element={<RVManager />} /> {/* For ?name= */}
      <Route path="/client/:name" element={<ClientProfilePage />} />
      <Route path="/client" element={<ClientDirectoryPage />} />

      </Routes>
    </Router>
  );
}

export default App;


