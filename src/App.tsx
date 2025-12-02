import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { BuilderPage } from './components/BuilderPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;