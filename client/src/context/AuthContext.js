import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone, password) => {
    const response = await authService.login(phone, password);
    if (!response.success) {
      throw new Error(response.message);
    }
    setUser(response.data.user);
    setToken(response.data.token);
    await AsyncStorage.setItem('userToken', response.data.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data;
  };

  const register = async (name, phone, email, password) => {
    const response = await authService.register(name, phone, email, password);
    if (!response.success) {
      throw new Error(response.message);
    }
    setUser(response.data.user);
    setToken(response.data.token);
    await AsyncStorage.setItem('userToken', response.data.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data;
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  };

  const updateUser = async (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
