import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/context/AuthContext';
import { LoadingProvider } from './src/context/LoadingContext';
import AppNavigator from './src/navigation/AppNavigator';
import FullscreenLoader from './src/components/FullscreenLoader';
import { toastConfig } from './src/utils/toastConfig';

export default function App() {
  useEffect(() => {
    // Ignore Metro connection warnings
    LogBox.ignoreLogs(['Remote debugger']);
    LogBox.ignoreAllLogs(); // Use this if you want to hide all logs
  }, []);

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
