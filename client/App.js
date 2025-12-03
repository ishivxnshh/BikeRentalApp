import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/context/AuthContext';
import { LoadingProvider } from './src/context/LoadingContext';
import AppNavigator from './src/navigation/AppNavigator';
import FullscreenLoader from './src/components/FullscreenLoader';
import { toastConfig } from './src/utils/toastConfig';

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <FullscreenLoader />
        <Toast config={toastConfig} />
      </AuthProvider>
    </LoadingProvider>
  );
}
