import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Chip, Grid, Card, CardContent 
} from '@mui/material';
import { issueService } from '../services/issueService';
import { authService } from '../services/authService';

function TrackStatus() {
  const currentUser = authService.getCurrentUser();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const data = await issueService.getUserIssues(currentUser.userId);
      setIssues(data);
    } catch (error) {
      console.error('Failed to load issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'RESOLVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reported Issues
      </Typography>

      {issues.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You haven't reported any issues yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {issues.map((issue) => (
            <Grid item xs={12} md={6} key={issue.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">
                      {issue.title}
                    </Typography>
                    <Chip 
                      label={issue.status} 
                      color={getStatusColor(issue.status)} 
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Category:</strong> {issue.category}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Location:</strong> {issue.location}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Description:</strong> {issue.description}
                  </Typography>
                  
                  {issue.departmentName && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Assigned to:</strong> {issue.departmentName}
                    </Typography>
                  )}
                  
                  <Typography variant="caption" color="text.secondary">
                    Reported on: {new Date(issue.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default TrackStatus;
