// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Make sure theme.js is correctly created
import Navbar from './components/Navbar';
import QueryStock from './components/QueryStock';
import BuySellStock from './components/BuySellStock';
import Portfolio from './components/Portfolio';
import BottomNav from './components/BottomNav'; // Import Bottom Navigation Component
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<QueryStock />} />
          <Route path="/buy-sell" element={<BuySellStock />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <BottomNav /> {/* Add Bottom Navigation here */}
      </Router>
    </ThemeProvider>
  );
}

export default App;

