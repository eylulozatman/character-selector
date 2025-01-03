import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './mainPage';
import AdminPage from './admin';
import HomePage from './homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
