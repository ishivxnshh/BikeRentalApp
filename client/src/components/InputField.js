import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={theme.colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },
});
