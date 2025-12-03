import api from './api';

export const vehicleService = {
  getAllVehicles: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await api.get('/vehicles', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch vehicles' };
    }
  },

  getVehicleDetails: async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch vehicle details' };
    }
  },

  updateStatus: async (id, status, batteryPercent, speed, range) => {
    try {
      const response = await api.patch(`/vehicles/${id}/status`, {
        status,
        batteryPercent,
        speed,
        range,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to update vehicle status' };
    }
  },

  updateLocation: async (id, lat, lng) => {
    try {
      const response = await api.patch(`/vehicles/${id}/location`, { lat, lng });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to update vehicle location' };
    }
  },

  sendCommand: async (id, command) => {
    try {
      const response = await api.post(`/vehicles/${id}/command`, { command });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to send command' };
    }
  },
};
