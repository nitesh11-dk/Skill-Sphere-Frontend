import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants/config.js';

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Auth: token }),
  };
};

// Generic API call handler with error handling
export const apiCall = async ({ 
  method = 'get',
  endpoint,
  data = null,
  requiresAuth = false,
  successMessage = '',
}) => {
  try {
    const headers = requiresAuth ? getAuthHeaders() : { 'Content-Type': 'application/json' };
    
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers,
      withCredentials: true,
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);

    if (response.data.success) {
      if (successMessage) {
        toast.success(successMessage || response.data.message);
      }
      return {
        success: true,
        data: response.data,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    handleApiError(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Error handler function
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data.message || 'Server error occurred';
    toast.error(message);
  } else if (error.request) {
    // Request made but no response
    toast.error('No response from server. Please check your connection.');
  } else {
    // Other errors
    toast.error(`Error: ${error.message}`);
  }
  console.error('API Error:', error);
};

// Token management
export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  removeToken: () => {
    localStorage.removeItem('token');
  },
};

// Validation helpers
export const validators = {
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  isEmptyObject: (obj) => {
    return Object.keys(obj).length === 0;
  },
}; 