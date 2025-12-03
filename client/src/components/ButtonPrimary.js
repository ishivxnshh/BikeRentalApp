import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../utils/theme';

export default function ButtonPrimary({ title, onPress, loading = false, disabled = false, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: theme.colors.gray,
  },
});
