import api from './api';

export const evService = {
  getAllEV: async () => {
    try {
      const response = await api.get('/ev/list');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch EVs' };
    }
  },
};
