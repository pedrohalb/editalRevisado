import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultEdital from './pages/DefaultEdital';
import SingleEdital from './pages/SingleEdital';
import SingleSelectTopic from './pages/SingleSelectTopic'; // Importe a nova página
import DefaultMateria from './pages/DefaultMateria';
import SingleMateria from './pages/SingleMateria';
import SingleTopic from './pages/SingleTopic';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultEdital />} />
        <Route path="/single-edital" element={<SingleEdital />} />
        <Route path="/single-select-topic" element={<SingleSelectTopic />} /> {/* Nova rota */}
        <Route path="/default-materia" element={<DefaultMateria />} />
        <Route path="/single-materia" element={<SingleMateria />} />
        <Route path="/single-topic" element={<SingleTopic />} />
      </Routes>
    </Router>
  );
};

export default App;
