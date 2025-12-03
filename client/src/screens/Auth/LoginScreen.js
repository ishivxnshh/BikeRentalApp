import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../components/InputField';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!phone || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setLoading(true);
    try {
      await login(phone, password);
      Toast.show({
        type: 'success',
        text1: 'Login successful',
        text2: 'Welcome back!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.error || 'Invalid credentials',
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
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <InputField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          keyboardType="phone-pad"
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <ButtonPrimary title="Login" onPress={handleLogin} loading={loading} />

        <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
          Don't have an account? Register
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
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
