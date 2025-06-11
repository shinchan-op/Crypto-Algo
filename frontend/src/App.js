import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';

// Layout components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import SymmetricPage from './pages/SymmetricPage';
import AsymmetricPage from './pages/AsymmetricPage';
import HashingPage from './pages/HashingPage';
import KeyGenerationPage from './pages/KeyGenerationPage';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/symmetric" element={<SymmetricPage />} />
            <Route path="/asymmetric" element={<AsymmetricPage />} />
            <Route path="/hashing" element={<HashingPage />} />
            <Route path="/key-generation" element={<KeyGenerationPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;