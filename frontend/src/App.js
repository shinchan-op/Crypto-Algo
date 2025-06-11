import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Layout components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import SymmetricPage from './pages/SymmetricPage';
import AsymmetricPage from './pages/AsymmetricPage';
import HashingPage from './pages/HashingPage';
import KeyGenerationPage from './pages/KeyGenerationPage';

// Enhanced dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: '#00c6ff',
      light: '#5ddef4',
      dark: '#0095cc'
    },
    secondary: { 
      main: '#ff6b6b',
      light: '#ff9999',
      dark: '#cc5555'
    },
    background: {
      default: '#181c24',
      paper: '#23293a',
    },
    text: {
      primary: '#e0e6ed',
      secondary: '#b0b8c1',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(35, 41, 58, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

function AppContent() {
  const location = useLocation();
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/symmetric" element={<SymmetricPage />} />
        <Route path="/asymmetric" element={<AsymmetricPage />} />
        <Route path="/hashing" element={<HashingPage />} />
        <Route path="/key-generation" element={<KeyGenerationPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Router>
          <AppContent />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;