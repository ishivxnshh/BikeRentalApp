import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Auto-attach token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network error (no internet)
    if (!error.response) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return Promise.reject({
        success: false,
        message: 'Network error, please check your connection',
      });
    }

    // 401 Unauthorized - Session expired
    if (error.response.status === 401) {
      // Clear storage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please login again',
      });

      // Trigger logout (will be handled by AuthContext listening to storage)
      // Navigation will happen automatically through AppNavigator
    }

    // Return standardized error format
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Something went wrong';

    return Promise.reject({
      success: false,
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

export default api;
