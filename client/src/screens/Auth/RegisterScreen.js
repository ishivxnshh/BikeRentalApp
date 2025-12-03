import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../components/InputField';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);
    try {
      await register(name, phone, email, password);
      Toast.show({
        type: 'success',
        text1: 'Registration complete',
        text2: 'Welcome to BikeRental!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.response?.data?.error || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <InputField
          label="Full Name *"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <InputField
          label="Phone Number *"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          keyboardType="phone-pad"
        />

        <InputField
          label="Email (Optional)"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputField
          label="Password *"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />

        <ButtonPrimary title="Register" onPress={handleRegister} loading={loading} />

        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
  },
  linkText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
  },
});
