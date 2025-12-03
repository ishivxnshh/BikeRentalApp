import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../utils/theme';
import { onboardingService } from '../services/onboardingService';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent({ navigation }) {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // Get stored token and user
    const token = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData');

    if (!token || !userData) {
      // No saved session, go to auth
      await SplashScreen.hideAsync();
      navigation.replace('Auth');
      return;
    }

    // Parse user data
    const user = JSON.parse(userData);

    // Check onboarding status
    const response = await onboardingService.getOnboardingStatus(user.id);
    
    await SplashScreen.hideAsync();

    if (response.success && response.data.onboardingStatus === 'verified') {
      // User is fully verified, go to main app
      navigation.replace('Main');
    } else {
      // User needs to complete onboarding or status check failed
      navigation.replace('Main'); // Still go to main tabs, they can access onboarding from there
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo placeholder - replace with your actual logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🏍️</Text>
          <Text style={styles.appName}>BikeRental</Text>
        </View>

        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoText: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  appName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
});
