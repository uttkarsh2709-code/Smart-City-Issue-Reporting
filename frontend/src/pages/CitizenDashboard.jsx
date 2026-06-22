import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const categories = ['POTHOLE', 'STREET_LIGHT', 'WATER_LEAKAGE', 'GARBAGE', 'SEWAGE', 'OTHER'];
const statusOptions = ['ALL', 'OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'];

function statusColor(status) {
  if (status === 'RESOLVED') return 'success';
  if (status === 'REJECTED') return 'error';
  if (status === 'IN_PROGRESS') return 'info';
  return 'warning';
}

function extractIssueId(message) {
  const match = message?.match(/Issue #(\d+)/i);
  return match ? Number(match[1]) : null;
}

export default function CitizenDashboard() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'POTHOLE',
    imageUrl: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [timelineLoading, setTimelineLoading] = useState(false);
  const [timelineIssueId, setTimelineIssueId] = useState(null);
  const [timelineItems, setTimelineItems] = useState([]);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackIssueId, setFeedbackIssueId] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [issuesRes, notificationsRes] = await Promise.all([
        api.get('/citizen/issues'),
        api.get('/citizen/notifications')
      ]);
      setIssues(issuesRes.data);
      setNotifications(notificationsRes.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 10000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported in this browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: String(pos.coords.latitude),
          longitude: String(pos.coords.longitude)
        }));
      },
      () => setError('Unable to fetch GPS location')
    );
  };

  const submitIssue = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.post('/citizen/issues', {
        ...form,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null
      });
      setMessage('Issue reported successfully');
      setSnackbarOpen(true);
      setForm({ title: '', description: '', category: 'POTHOLE', imageUrl: '', address: '', latitude: '', longitude: '' });
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to submit issue');
    }
  };

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchStatus = statusFilter === 'ALL' || issue.status === statusFilter;
      const matchQuery = !query
        || issue.title?.toLowerCase().includes(query)
        || issue.description?.toLowerCase().includes(query)
        || issue.address?.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });
  }, [issues, search, statusFilter]);

  const resolvedCount = issues.filter((x) => x.status === 'RESOLVED').length;
  const inProgressCount = issues.filter((x) => x.status === 'IN_PROGRESS').length;
  const unreadNotifications = notifications.filter((x) => !x.isRead).length;
  const adminReplies = useMemo(
    () => notifications.filter((notification) => notification.title === 'Admin Reply'),
    [notifications]
  );
  const replyByIssueId = useMemo(() => {
    const map = new Map();
    adminReplies.forEach((notification) => {
      const issueId = extractIssueId(notification.message);
      if (issueId) {
        map.set(issueId, notification);
      }
    });
    return map;
  }, [adminReplies]);

  const openTimeline = async (issueId) => {
    setTimelineOpen(true);
    setTimelineIssueId(issueId);
    setTimelineLoading(true);
    try {
      const { data } = await api.get(`/citizen/issues/${issueId}/timeline`);
      setTimelineItems(data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load timeline');
    } finally {
      setTimelineLoading(false);
    }
  };

  const openFeedback = (issueId) => {
    setFeedbackIssueId(issueId);
    setFeedback({ rating: 5, comment: '' });
    setFeedbackOpen(true);
  };

  const submitFeedback = async () => {
    try {
      await api.post(`/citizen/issues/${feedbackIssueId}/feedback`, feedback);
      setFeedbackOpen(false);
      setMessage('Feedback submitted successfully');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return (
    <Stack spacing={3}>
      {loading && <LinearProgress />}

      <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(126, 231, 255, 0.14), transparent 22%), radial-gradient(circle at bottom left, rgba(255, 122, 162, 0.14), transparent 24%)', pointerEvents: 'none' }} />
        <Stack spacing={1} sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ letterSpacing: 3, color: 'rgba(245,248,255,0.62)' }}>Citizen dashboard</Typography>
          <Typography variant="h4">Track your city reports in real time</Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 760 }}>
            Submit a civic issue, watch the timeline move, and get notifications when the city responds.
          </Typography>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Admin Replies</Typography>
        <Stack spacing={1.5}>
          {adminReplies.map((reply) => (
            <Card key={reply.id} sx={{ border: '1px solid rgba(126, 231, 255, 0.22)' }}>
              <CardContent>
                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip label="Admin Reply" color="primary" size="small" />
                    <Typography variant="subtitle2">{reply.title}</Typography>
                  </Stack>
                  <Typography variant="body2">{reply.message}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(reply.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
          {adminReplies.length === 0 && <Alert severity="info">No admin replies yet.</Alert>}
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption">Total Issues</Typography>
            <Typography variant="h5">{issues.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption">Resolved</Typography>
            <Typography variant="h5">{resolvedCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption">In Progress</Typography>
            <Typography variant="h5">{inProgressCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption">Unread Notifications</Typography>
            <Typography variant="h5">{unreadNotifications}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Report a New Civic Issue</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        <Box component="form" onSubmit={submitIssue}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Grid>
            <Grid item xs={12} md={6}><TextField select fullWidth label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>
            <Grid item xs={12}><TextField fullWidth multiline minRows={3} label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Latitude" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Longitude" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><Button variant="outlined" fullWidth sx={{ height: '100%' }} onClick={getCurrentLocation}>Use GPS</Button></Grid>
            <Grid item xs={12}><Button type="submit" variant="contained">Submit Issue</Button></Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" mb={2}>
          <Typography variant="h6">My Issues (Real-time status refresh)</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            <TextField
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {filteredIssues.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>No issues match your filter.</Alert>
        )}

        <Grid container spacing={2}>
          {filteredIssues.map((issue) => (
            <Grid item xs={12} md={6} key={issue.id}>
              <Card sx={{ border: '1px solid #e7ece8' }}>
                <CardContent>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle1">#{issue.id} {issue.title}</Typography>
                    <Typography variant="body2">{issue.description}</Typography>
                    {issue.imageUrl && (
                      <Box
                        component="img"
                        src={issue.imageUrl}
                        alt={issue.title}
                        sx={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 1 }}
                      />
                    )}
                    <Chip label={issue.status} color={statusColor(issue.status)} sx={{ width: 'fit-content' }} />
                    <Typography variant="caption">Department: {issue.assignedDepartment || 'Unassigned'}</Typography>
                    <Typography variant="caption">Address: {issue.address || 'Not provided'}</Typography>
                    {replyByIssueId.get(issue.id) && (
                      <Alert severity="success" sx={{ mt: 1 }}>
                        {replyByIssueId.get(issue.id).message}
                      </Alert>
                    )}
                    <Divider />
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" onClick={() => openTimeline(issue.id)}>View Timeline</Button>
                      {issue.status === 'RESOLVED' && (
                        <Button size="small" variant="contained" onClick={() => openFeedback(issue.id)}>Give Feedback</Button>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Notifications</Typography>
        <Stack spacing={1}>
          {notifications.map((n) => (
            <Alert key={n.id} severity={n.isRead ? 'info' : 'success'}>{n.title}: {n.message}</Alert>
          ))}
          {notifications.length === 0 && <Alert severity="info">No notifications yet.</Alert>}
        </Stack>
      </Paper>

      <Dialog open={timelineOpen} onClose={() => setTimelineOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Issue Timeline #{timelineIssueId}</DialogTitle>
        <DialogContent dividers>
          {timelineLoading && <LinearProgress sx={{ mb: 2 }} />}
          <Stack spacing={1.5}>
            {timelineItems.map((item) => (
              <Paper key={item.id} variant="outlined" sx={{ p: 1.5 }}>
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">{item.status}</Typography>
                  <Typography variant="body2">{item.comment}</Typography>
                  <Typography variant="caption">By {item.changedBy} at {new Date(item.changedAt).toLocaleString()}</Typography>
                </Stack>
              </Paper>
            ))}
            {!timelineLoading && timelineItems.length === 0 && <Alert severity="info">No timeline entries yet.</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTimelineOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Rate Resolved Issue</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={feedback.rating}
                label="Rating"
                onChange={(e) => setFeedback((prev) => ({ ...prev, rating: Number(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="Comment"
              multiline
              minRows={3}
              value={feedback.comment}
              onChange={(e) => setFeedback((prev) => ({ ...prev, comment: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitFeedback}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        message={message}
      />
    </Stack>
  );
}
