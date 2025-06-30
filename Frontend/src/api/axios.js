import axios from 'axios';

// Create an instance of axios with custom config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token, etc)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // You can redirect to login page or dispatch a logout action here
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
