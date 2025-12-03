import api from './api';

export const plansService = {
  getAllPlans: async () => {
    try {
      const response = await api.get('/rental-plans');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch rental plans' };
    }
  },
};
