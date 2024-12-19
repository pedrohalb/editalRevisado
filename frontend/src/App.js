import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultEdital from './pages/DefaultEdital';
import SingleEdital from './pages/SingleEdital'; // Importe a nova página

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultEdital />} />
        <Route path="/single-edital" element={<SingleEdital />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
};

export default App;
