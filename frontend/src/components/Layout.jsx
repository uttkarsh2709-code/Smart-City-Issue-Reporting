import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { auth, logout } = useAuth();
  const location = useLocation();

  const navButtonSx = (active) => ({
    color: active ? '#07111f' : '#f5f8ff',
    background: active ? 'linear-gradient(135deg, #7ee7ff, #ff7aa2)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.18)',
    boxShadow: active ? '0 12px 24px rgba(126, 231, 255, 0.25)' : 'none',
    '&:hover': {
      background: active ? 'linear-gradient(135deg, #7ee7ff, #ff7aa2)' : 'rgba(255,255,255,0.08)'
    }
  });

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 15% 20%, rgba(126, 231, 255, 0.22), transparent 22%), radial-gradient(circle at 80% 8%, rgba(255, 122, 162, 0.22), transparent 20%), radial-gradient(circle at 78% 72%, rgba(122, 140, 255, 0.2), transparent 26%)',
          pointerEvents: 'none'
        }}
      />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(9, 15, 30, 0.7)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, #7ee7ff, #ff7aa2)',
                color: '#07111f',
                fontSize: 22,
                fontWeight: 800,
                boxShadow: '0 12px 28px rgba(126, 231, 255, 0.28)'
              }}
            >
              ✦
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>Smart City</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(245,248,255,0.68)' }}>Civic issue reporting</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 1 }}>
            {!auth.token && <Button component={Link} to="/" sx={navButtonSx(location.pathname === '/')}>Home</Button>}
            {!auth.token && <Button component={Link} to="/login" sx={navButtonSx(location.pathname === '/login')}>Login</Button>}
            {!auth.token && <Button component={Link} to="/register" sx={navButtonSx(location.pathname === '/register')}>Register</Button>}
            {auth.role === 'ROLE_CITIZEN' && <Button component={Link} to="/citizen" sx={navButtonSx(location.pathname === '/citizen')}>Citizen</Button>}
            {auth.role === 'ROLE_ADMIN' && <Button component={Link} to="/admin" sx={navButtonSx(location.pathname === '/admin')}>Admin</Button>}
            {auth.token && <Button onClick={logout} sx={navButtonSx(false)}>Logout</Button>}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>{children}</Container>
    </Box>
  );
}
