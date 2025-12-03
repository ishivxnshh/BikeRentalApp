import api from './api';

export const profileService = {
  getProfileStatus: async (userId) => {
    try {
      const response = await api.get(`/onboarding/status/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch profile status' };
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await api.put('/auth/update-profile', data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to update profile' };
    }
  },
};
