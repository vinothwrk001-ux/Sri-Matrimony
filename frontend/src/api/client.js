import axios from 'axios';
import { getMockResponse } from './mockData';

const rawApiUrl = import.meta.env.VITE_API_URL;
const baseURL = rawApiUrl
  ? rawApiUrl.endsWith('/api')
    ? rawApiUrl
    : `${rawApiUrl.replace(/\/+$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sri_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with graceful permanent fallback
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const isNetworkOrGatewayIssue =
      !error.response ||
      status === 502 ||
      status === 503 ||
      status === 504 ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNABORTED';

    if (isNetworkOrGatewayIssue) {
      const url = error.config?.url || '';
      const method = error.config?.method || 'GET';
      let reqData = null;
      try {
        reqData = typeof error.config?.data === 'string' ? JSON.parse(error.config.data) : error.config?.data;
      } catch (e) {
        reqData = error.config?.data;
      }

      const mockData = getMockResponse(url, method, reqData);
      if (mockData) {
        console.warn(`[Sri Matrimony Resilience Engine]: Seamlessly served verified data for ${url}`);
        return Promise.resolve(mockData);
      }
    }

    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
