import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

import MethodsPage from './pages/MethodsPage';
import RecordsPage from './pages/RecordsPage';
import TipsPage from './pages/TipsPage';
import ForecastPage from './pages/ForecastPage';
import CalculatorPage from './pages/CalculatorPage';
import FishEncyclopediaPage from './pages/FishEncyclopediaPage';
import RarityPage from './pages/RarityPage';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><MethodsPage /></PageWrapper>} />
        <Route path="/atlas" element={<PageWrapper><FishEncyclopediaPage /></PageWrapper>} />
        <Route path="/records" element={<PageWrapper><RecordsPage /></PageWrapper>} />
        <Route path="/tips" element={<PageWrapper><TipsPage /></PageWrapper>} />
        <Route path="/forecast" element={<PageWrapper><ForecastPage /></PageWrapper>} />
        <Route path="/calculator" element={<PageWrapper><CalculatorPage /></PageWrapper>} />
        <Route path="/rarity" element={<PageWrapper><RarityPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">🎣</span> ProFishing
          </div>

          <nav className="nav-links">
            <Link to="/">Методы</Link>
            <Link to="/atlas">Атлас рыб</Link>
            <Link to="/records">Уловы</Link>
            <Link to="/tips">Советы</Link>
            <Link to="/forecast">Прогноз клёва</Link>
            <Link to="/calculator">Калькулятор</Link>
            <Link to="/rarity">Редкости</Link>
          </nav>
        </header>

        <main className="container">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}