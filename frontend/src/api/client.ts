import axios from 'axios';
import { envConfig } from '../../config';

const api = axios.create({
  baseURL: envConfig.apiBaseUrl,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Please log in again.');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
