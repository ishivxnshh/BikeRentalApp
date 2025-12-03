import api from './api';

export const issuesService = {
  getCategories: async () => {
    try {
      const response = await api.get('/issues/categories');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch categories' };
    }
  },

  submitIssue: async (userId, category, description) => {
    try {
      const response = await api.post('/issues/report', { userId, category, description });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to submit issue' };
    }
  },
};
