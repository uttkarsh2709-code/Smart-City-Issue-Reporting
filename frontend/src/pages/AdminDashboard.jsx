import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Paper,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const statusOptions = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'];
const statusFilterOptions = ['ALL', ...statusOptions];

function statusColor(status) {
  if (status === 'RESOLVED') return 'success';
  if (status === 'REJECTED') return 'error';
  if (status === 'IN_PROGRESS') return 'info';
  return 'warning';
}

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [issuesRes, analyticsRes] = await Promise.all([
        api.get('/admin/issues'),
        api.get('/admin/analytics')
      ]);
      setIssues(issuesRes.data);
      setAnalytics(analyticsRes.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 15000);
    return () => clearInterval(timer);
  }, []);

  const updateIssue = async (issue) => {
    try {
      await api.patch(`/admin/issues/${issue.id}/status`, {
        status: issue.status,
        comment: issue.comment || 'Status updated by admin',
        assignedDepartment: issue.assignedDepartment || '',
        assignedOfficer: issue.assignedOfficer || ''
      });
      
      // Send notification to citizen if there's a comment/reply
      if (issue.comment) {
        try {
          await api.post('/admin/send-notification', {
            userId: issue.reportedBy?.id,
            title: `Issue #${issue.id} - Status Update`,
            message: issue.comment
          });
        } catch (notifErr) {
          console.warn('Failed to send notification:', notifErr);
        }
      }
      
      setMessage(`Issue #${issue.id} updated`);
      setSnackbarOpen(true);
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.error || 'Status update failed');
    }
  };

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchStatus = statusFilter === 'ALL' || issue.status === statusFilter;
      const matchQuery = !query
        || String(issue.id || '').includes(query)
        || issue.title?.toLowerCase().includes(query)
        || issue.description?.toLowerCase().includes(query)
        || issue.category?.toLowerCase().includes(query)
        || issue.address?.toLowerCase().includes(query)
        || issue.reportedBy?.fullName?.toLowerCase().includes(query)
        || issue.reportedBy?.email?.toLowerCase().includes(query)
        || issue.assignedDepartment?.toLowerCase().includes(query)
        || issue.assignedOfficer?.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });
  }, [issues, search, statusFilter]);

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <LinearProgress />}

      <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(126, 231, 255, 0.15), transparent 24%), radial-gradient(circle at bottom left, rgba(255, 122, 162, 0.14), transparent 25%)', pointerEvents: 'none' }} />
        <Stack spacing={1} sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ letterSpacing: 3, color: 'rgba(245,248,255,0.62)' }}>Command center</Typography>
          <Typography variant="h4">Admin Command Center</Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 760 }}>
            A live glass-panel view of city complaints, status movement, and performance metrics.
          </Typography>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
          <TextField size="small" label="Search issues" value={search} onChange={(e) => setSearch(e.target.value)} />
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              {statusFilterOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={loadData}>Refresh</Button>
        </Stack>
      </Stack>

      {lastUpdated && (
        <Typography variant="caption" color="text.secondary">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>
      )}

      {analytics && (
        <Grid container spacing={2} alignItems="stretch">
          {[
            ['Total', analytics.total],
            ['Open', analytics.open],
            ['Assigned', analytics.assigned],
            ['In Progress', analytics.inProgress],
            ['Resolved', analytics.resolved],
            ['Resolution Rate %', analytics.resolutionRate]
          ].map(([label, value]) => (
            <Grid item xs={6} md={2} key={label}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="caption">{label}</Typography>
                  <Typography variant="h6">{value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Resolution Progress</Typography>
                  <LinearProgress variant="determinate" value={Number(analytics.resolutionRate) || 0} sx={{ height: 10, borderRadius: 10 }} />
                  <Typography variant="caption">{analytics.resolutionRate}% of issues resolved</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Typography variant="h6">Manage Reported Issues ({filteredIssues.length})</Typography>
      {filteredIssues.length === 0 && <Alert severity="info">No issues match your filters.</Alert>}
      <Grid container spacing={2}>
        {filteredIssues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <Card sx={{ border: '1px solid #e7ece8' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle1">#{issue.id} {issue.title}</Typography>
                    <Chip label={issue.status} size="small" color={statusColor(issue.status)} />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Reported by: {issue.reportedBy?.fullName || 'Unknown'} ({issue.reportedBy?.email || 'N/A'})
                  </Typography>
                  <Typography variant="body2">{issue.description}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        select
                        fullWidth
                        label="Status"
                        value={issue.status}
                        onChange={(e) => setIssues((prev) => prev.map((x) => x.id === issue.id ? { ...x, status: e.target.value } : x))}
                      >
                        {statusOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Department"
                        value={issue.assignedDepartment || ''}
                        onChange={(e) => setIssues((prev) => prev.map((x) => x.id === issue.id ? { ...x, assignedDepartment: e.target.value } : x))}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Officer"
                        value={issue.assignedOfficer || ''}
                        onChange={(e) => setIssues((prev) => prev.map((x) => x.id === issue.id ? { ...x, assignedOfficer: e.target.value } : x))}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Reply to user"
                        helperText="This message will be sent to the citizen as a reply"
                        value={issue.comment || ''}
                        onChange={(e) => setIssues((prev) => prev.map((x) => x.id === issue.id ? { ...x, comment: e.target.value } : x))}
                      />
                    </Grid>
                  </Grid>
                  <Button variant="contained" onClick={() => updateIssue(issue)} sx={{ width: 'fit-content' }}>Update Issue</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        message={message}
      />
    </Stack>
  );
}
