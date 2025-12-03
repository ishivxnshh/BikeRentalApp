import api from './api';

export const authService = {
  login: async (phone, password) => {
    try {
      const response = await api.post('/auth/login', { phone, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    }
  },

  register: async (name, phone, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, phone, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  },
};
