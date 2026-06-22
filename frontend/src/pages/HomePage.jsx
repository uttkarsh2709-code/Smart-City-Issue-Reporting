import { Box, Button, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SmartCityIllustration from '../components/SmartCityIllustration';

export default function HomePage() {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Paper
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, md: 5 },
          background: 'linear-gradient(135deg, rgba(13, 22, 54, 0.92), rgba(35, 40, 106, 0.88))'
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(126, 231, 255, 0.2), transparent 20%), radial-gradient(circle at bottom left, rgba(255, 122, 162, 0.18), transparent 24%)', pointerEvents: 'none' }} />
        <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Real-time reporting" sx={{ bgcolor: 'rgba(126, 231, 255, 0.18)', color: '#dffbff' }} />
                <Chip label="Geo-tagged issues" sx={{ bgcolor: 'rgba(255, 122, 162, 0.18)', color: '#ffdce8' }} />
              </Stack>
              <Typography variant="overline" sx={{ letterSpacing: 3, color: 'rgba(245,248,255,0.62)' }}>Smart city civic platform</Typography>
              <Typography variant="h2" sx={{ lineHeight: 0.95 }}>
                Report issues like a smart city hero.
              </Typography>
              <Typography sx={{ maxWidth: 620, color: 'text.secondary', fontSize: { xs: 16, md: 18 } }}>
                Citizens can report potholes, broken lights, garbage, and water leaks while authorities track progress in one lively dashboard.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} to="/register" variant="contained" size="large" sx={{ px: 3 }}>Get Started</Button>
                <Button component={Link} to="/login" variant="outlined" size="large" sx={{ px: 3 }}>Sign in</Button>
              </Stack>
              <Stack direction="row" spacing={3} flexWrap="wrap">
                {[
                  ['24/7', 'Reporting'],
                  ['Live', 'Status tracking'],
                  ['GPS', 'Location aware']
                ].map(([big, small]) => (
                  <Box key={small} sx={{ minWidth: 90 }}>
                    <Typography variant="h5">{big}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{small}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <SmartCityIllustration />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {[
          ['Cartoon city scene', 'A playful neon illustration gives the app a friendlier civic vibe.'],
          ['Interactive actions', 'Quick report buttons, live notifications, and timeline cards keep it engaging.'],
          ['Real-world reporting', 'Location, photos, and issue status help users track every complaint.']
        ].map(([title, text]) => (
          <Grid item xs={12} md={4} key={title}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Stack spacing={1.2}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{text}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
