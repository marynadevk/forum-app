import axios from 'axios';
import { envConfig } from '../../config';
import useTokenStore from 'src/store/token.store';

const api = axios.create({
  baseURL: envConfig.apiBaseUrlExpress,
  // baseURL: envConfig.v2_apiBaseUrlExpress,
  // baseURL: envConfig.apiBaseUrlNest,
  // baseURL: envConfig.v2_apiBaseUrlNest,
});

api.interceptors.request.use(
  config => {
    const { token } = useTokenStore.getState();
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
      useTokenStore.getState().removeToken();
    }
    return Promise.reject(error);
  }
);

export default api;
