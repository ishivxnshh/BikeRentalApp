import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

export default function Loader({ text = 'Please wait...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textLight,
  },
});
