import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Grid, Card, CardContent, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, Button, Dialog, DialogTitle, DialogContent,
  TextField, MenuItem, Box
} from '@mui/material';
import { issueService } from '../services/issueService';
import { departmentService } from '../services/departmentService';

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    departmentId: '',
    priority: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const issuesData = await issueService.getAllIssues();
      const deptData = await departmentService.getAllDepartments();
      
      setIssues(issuesData);
      setDepartments(deptData);
      
      // Calculate statistics
      const stats = {
        total: issuesData.length,
        pending: issuesData.filter(i => i.status === 'PENDING').length,
        inProgress: issuesData.filter(i => i.status === 'IN_PROGRESS').length,
        resolved: issuesData.filter(i => i.status === 'RESOLVED').length,
      };
      setStats(stats);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleOpenDialog = (issue) => {
    setSelectedIssue(issue);
    setUpdateData({
      status: issue.status,
      departmentId: issue.departmentId || '',
      priority: issue.priority,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIssue(null);
  };

  const handleUpdate = async () => {
    try {
      await issueService.updateStatus(selectedIssue.id, updateData);
      handleCloseDialog();
      loadData();
      alert('Issue updated successfully!');
    } catch (error) {
      alert('Failed to update issue');
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Issues
              </Typography>
              <Typography variant="h4">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" color="info.main">
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.resolved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Issues Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        All Issues
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell>
                  <Chip 
                    label={issue.status} 
                    color={getStatusColor(issue.status)} 
                    size="small"
                  />
                </TableCell>
                <TableCell>{issue.priority}</TableCell>
                <TableCell>{issue.departmentName || 'Not Assigned'}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleOpenDialog(issue)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Update Issue</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              select
              label="Status"
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              margin="normal"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="RESOLVED">Resolved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </TextField>

            <TextField
              fullWidth
              select
              label="Department"
              value={updateData.departmentId}
              onChange={(e) => setUpdateData({ ...updateData, departmentId: e.target.value })}
              margin="normal"
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Priority"
              value={updateData.priority}
              onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
              margin="normal"
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="CRITICAL">Critical</MenuItem>
            </TextField>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
