import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';

export default function OnboardingHome({ navigation }) {
  const onboardingSteps = [
    { id: 1, title: 'Aadhaar Card', icon: 'card-outline', screen: 'AadhaarScreen' },
    { id: 2, title: 'PAN Card', icon: 'document-text-outline', screen: 'PanScreen' },
    { id: 3, title: 'Driving License', icon: 'car-outline', screen: 'DLScreen' },
    { id: 4, title: 'Bank Account', icon: 'wallet-outline', screen: 'BankScreen' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Complete Your Onboarding</Text>
      <Text style={styles.subtitle}>Submit your documents to get verified</Text>

      {onboardingSteps.map((step) => (
        <TouchableOpacity
          key={step.id}
          style={styles.card}
          onPress={() => navigation.navigate(step.screen)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={step.icon} size={32} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepSubtitle}>Tap to submit</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => navigation.navigate('VerificationStatusScreen')}
      >
        <Ionicons name="checkmark-circle-outline" size={24} color={theme.colors.white} />
        <Text style={styles.statusButtonText}>Check Verification Status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs / 2,
  },
  stepSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  statusButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  statusButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
});
