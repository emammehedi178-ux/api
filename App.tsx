import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FormPage from './pages/FormPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
        <AnimatedRoutes />
      </div>
    </HashRouter>
  );
};

export default App;