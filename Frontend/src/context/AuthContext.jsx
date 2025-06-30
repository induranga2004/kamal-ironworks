import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set token in axios header and localStorage
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user from token
  const loadUser = async () => {
    if (token) {
      setAuthToken(token);
      try {
        const { data } = await api.get('/api/users/profile');
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user:', error);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
      }
    }
    setLoading(false);
  };

  // Login user
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      setToken(data.token);
      setAuthToken(data.token);
      await loadUser();
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${data.name}!`,
        status: 'success',
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast({
        title: 'Login Failed',
        description: message,
        status: 'error',
      });
      throw error;
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const { data } = await api.post('/api/users', userData);
      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account.',
        status: 'success',
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast({
        title: 'Registration Failed',
        description: message,
        status: 'error',
      });
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    navigate('/');
    toast({
      title: 'Logout Successful',
      description: 'You have been logged out.',
      status: 'success',
    });
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const { data } = await api.put('/api/users/profile', userData);
      setUser(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
        status: 'success',
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast({
        title: 'Update Failed',
        description: message,
        status: 'error',
      });
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
