import api from './api';

export const dashboardService = {
  getEarnings: async (userId) => {
    try {
      const response = await api.get(`/dashboard/earnings/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch earnings' };
    }
  },
};
