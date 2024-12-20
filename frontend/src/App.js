import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultEdital from './pages/DefaultEdital';
import SingleEdital from './pages/SingleEdital';
import SingleSelectTopic from './pages/SingleSelectTopic'; // Importe a nova página

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultEdital />} />
        <Route path="/single-edital" element={<SingleEdital />} />
        <Route path="/single-select-topic" element={<SingleSelectTopic />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
};

export default App;
