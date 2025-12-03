import api from './api';

export const authService = {
  login: async (phone, password) => {
    try {
      const response = await api.post('/auth/login', { phone, password });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      return { success: false, message: errorMessage };
    }
  },

  register: async (name, phone, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, phone, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
      return { success: false, message: errorMessage };
    }
  },
};
