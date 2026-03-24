import axios from 'axios';
import appConfig from '../config/appConfig';

const API_BASE_URL = appConfig.apiBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: appConfig.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. Please check your connection and try again.';
    }

    return Promise.reject(error);
  }
);

export default api;
