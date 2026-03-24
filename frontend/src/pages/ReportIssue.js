import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper, 
  MenuItem, Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { issueService } from '../services/issueService';
import { authService } from '../services/authService';

const categories = [
  'Road & Transportation',
  'Water Supply',
  'Electricity',
  'Sanitation',
  'Traffic Signal',
  'Public Works',
  'Others',
];

const MAX_IMAGE_URL_LENGTH = 2000;

function ReportIssue() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    latitude: null,
    longitude: null,
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setSuccess('Location captured successfully!');
        },
        (error) => {
          setError('Unable to get location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.imageUrl && formData.imageUrl.trim().length > MAX_IMAGE_URL_LENGTH) {
      setError('Image URL is too long. Please use a shorter direct image link.');
      return;
    }

    setLoading(true);

    try {
      await issueService.reportIssue(currentUser.userId, formData);
      setSuccess('Issue reported successfully!');
      setTimeout(() => {
        navigate('/my-issues');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Report an Issue
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Issue Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
            placeholder="e.g., Large pothole on MG Road"
          />
          
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
            placeholder="Describe the issue in detail"
          />
          
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            required
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
            placeholder="e.g., MG Road, Near City Mall"
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button variant="outlined" onClick={getLocation}>
              Get Current Location
            </Button>
            {formData.latitude && formData.longitude && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Location: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
              </Typography>
            )}
          </Box>
          
          <TextField
            fullWidth
            label="Image URL (Optional)"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            margin="normal"
            placeholder="Enter image URL"
            inputProps={{ maxLength: MAX_IMAGE_URL_LENGTH }}
            helperText="Tip: use a direct image URL. Very long redirect URLs may fail."
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ReportIssue;
