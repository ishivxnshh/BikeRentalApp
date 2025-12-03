import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../services/profileService';
import InputField from '../../components/InputField';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Name is required',
      });
      return;
    }

    // Basic email validation if provided
    if (email && !email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }

    setLoading(true);
    const response = await profileService.updateProfile({ name, email });
    setLoading(false);

    if (!response.success) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: response.message,
      });
      return;
    }

    // Update AuthContext with new user data
    await updateUser({ name, email });

    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
      text2: 'Your changes have been saved',
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.subtitle}>Update your personal information</Text>

        <View style={styles.form}>
          <InputField
            label="Full Name *"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📱 Phone number cannot be changed
            </Text>
            <Text style={styles.phoneText}>{user?.phone}</Text>
          </View>

          <ButtonPrimary 
            title="Save Changes" 
            onPress={handleSave} 
            loading={loading}
          />

          <ButtonPrimary
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
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
    marginBottom: theme.spacing.xl,
  },
  form: {
    marginTop: theme.spacing.md,
  },
  infoBox: {
    backgroundColor: theme.colors.light,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  phoneText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: theme.colors.gray,
    marginTop: theme.spacing.sm,
  },
});
