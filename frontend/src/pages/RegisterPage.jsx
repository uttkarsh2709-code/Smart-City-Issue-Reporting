;import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import SmartCityIllustration from '../components/SmartCityIllustration';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/citizen');
    } catch (err) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ overflow: 'hidden', maxWidth: 980, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, minHeight: 560 }}>
        <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, rgba(17, 24, 51, 0.95), rgba(53, 28, 82, 0.9))' }}>
          <Stack spacing={2.5} alignItems="center" sx={{ width: '100%' }}>
            <Typography variant="overline" sx={{ color: 'rgba(245,248,255,0.62)', letterSpacing: 3 }}>Join the city network</Typography>
            <SmartCityIllustration compact />
            <Typography variant="h5" sx={{ textAlign: 'center' }}>Create your citizen account</Typography>
            <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
              Share civic issues with a city platform that feels friendly, modern, and responsive.
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h4" mb={1}>Create account</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>Sign up and start reporting smart-city issues.</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <Button type="submit" variant="contained" size="large">Register</Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
