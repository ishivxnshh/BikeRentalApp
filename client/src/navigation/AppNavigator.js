import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';
import SplashScreenComponent from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
      </Stack.Navigator>
    );
  }

  return user ? <MainTabs /> : <AuthNavigator />;
}
