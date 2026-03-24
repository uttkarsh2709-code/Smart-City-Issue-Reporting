import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { authService } from './services/authService';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportIssue from './pages/ReportIssue';
import IssueList from './pages/IssueList';
import TrackStatus from './pages/TrackStatus';
import AdminDashboard from './pages/AdminDashboard';
import appConfig from './config/appConfig';

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    document.body.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: '#0f766e',
          },
          secondary: {
            main: '#ef6c00',
          },
          background:
            themeMode === 'light'
              ? { default: '#f7faf9', paper: '#ffffff' }
              : { default: '#0f1720', paper: '#1a2430' },
        },
        shape: {
          borderRadius: 14,
        },
      }),
    [themeMode]
  );

  const ProtectedRoute = ({ children }) => {
    return authService.isAuthenticated() ? children : <Navigate to="/login" />;
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App app-shell">
          <Navbar themeMode={themeMode} onToggleTheme={toggleTheme} />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/report-issue"
                element={
                  <ProtectedRoute>
                    <ReportIssue />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-issues"
                element={
                  <ProtectedRoute>
                    <TrackStatus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/issues"
                element={
                  <ProtectedRoute>
                    <IssueList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <footer className="app-footer">
            Need help? Contact {appConfig.supportEmail}
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
