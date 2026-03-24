import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import ReportIcon from '@mui/icons-material/Report';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Home() {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" gutterBottom>
          Welcome to Smart City Issue Reporting
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Report city problems and help make our city better
        </Typography>
        {!isAuthenticated && (
          <Box mt={3}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/register"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/login"
            >
              Login
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <ReportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Report Issues
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Easily report potholes, broken street lights, garbage issues, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <TrackChangesIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Track Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your reported issues in real-time and get updates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <DashboardIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Fast Resolution
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Issues are assigned to relevant departments for quick resolution.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Common Issue Categories
        </Typography>
        <Box mt={3}>
          <Button variant="outlined" sx={{ m: 1 }}>Road & Transportation</Button>
          <Button variant="outlined" sx={{ m: 1 }}>Water Supply</Button>
          <Button variant="outlined" sx={{ m: 1 }}>Electricity</Button>
          <Button variant="outlined" sx={{ m: 1 }}>Sanitation</Button>
          <Button variant="outlined" sx={{ m: 1 }}>Public Works</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
