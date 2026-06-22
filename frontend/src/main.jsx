import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 800 },
    h2: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 800 },
    h3: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 800 },
    h4: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 800 },
    h5: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 700 }
  },
  palette: {
    mode: 'dark',
    primary: { main: '#7ee7ff' },
    secondary: { main: '#ff7aa2' },
    background: {
      default: '#07111f',
      paper: 'rgba(12, 20, 42, 0.78)'
    },
    text: {
      primary: '#f5f8ff',
      secondary: 'rgba(245, 248, 255, 0.72)'
    }
  },
  shape: { borderRadius: 20 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle at top left, #1a2b72 0, #0a1223 38%, #060b16 100%)',
          minHeight: '100vh'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(180deg, rgba(15, 25, 51, 0.88), rgba(10, 16, 34, 0.92))',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.28)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(180deg, rgba(15, 25, 51, 0.9), rgba(10, 16, 34, 0.95))',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.03)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 700
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
