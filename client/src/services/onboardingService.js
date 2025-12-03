import api from './api';

export const onboardingService = {
  submitAadhaar: async (userId, aadhaarNumber, image = null) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('aadhaarNumber', aadhaarNumber);
      
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      }

      const response = await api.post('/onboarding/aadhaar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to submit Aadhaar' };
    }
  },

  submitPAN: async (userId, panNumber, image = null) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('panNumber', panNumber);
      
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      }

      const response = await api.post('/onboarding/pan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to submit PAN' };
    }
  },

  submitDL: async (userId, dlNumber, image = null) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('dlNumber', dlNumber);
      
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      }

      const response = await api.post('/onboarding/dl', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to submit DL' };
    }
  },

  submitBank: async (userId, bankAccount, ifscCode, image = null) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('bankAccount', bankAccount);
      formData.append('ifscCode', ifscCode);
      
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      }

      const response = await api.post('/onboarding/bank', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to submit bank details' };
    }
  },

  getOnboardingStatus: async (userId) => {
    try {
      const response = await api.get(`/onboarding/status/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch status' };
    }
  },

  updateStatus: async (userId) => {
    try {
      const response = await api.patch(`/onboarding/update-status/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to update status' };
    }
  },
};
