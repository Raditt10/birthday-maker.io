import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import CountdownMission from './pages/CountdownMission';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/mission/:name/:day/:month" element={<CountdownMission />} />
        <Route path="/mission/:name/:day/:month/:character" element={<CountdownMission />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;