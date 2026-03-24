import api from './api';

export const issueService = {
  reportIssue: async (userId, issueData) => {
    const response = await api.post(`/issues/report?userId=${userId}`, issueData);
    return response.data;
  },

  getAllIssues: async () => {
    const response = await api.get('/issues');
    return response.data;
  },

  getUserIssues: async (userId) => {
    const response = await api.get(`/issues/user/${userId}`);
    return response.data;
  },

  getIssueById: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  updateStatus: async (id, statusData) => {
    const response = await api.put(`/issues/${id}/status`, statusData);
    return response.data;
  },

  deleteIssue: async (id) => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },
};
