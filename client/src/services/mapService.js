import api from './api';

export const mapService = {
  getVehicleLocations: async () => {
    try {
      const response = await api.get('/map/vehicles');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch vehicle locations' };
    }
  },
};
