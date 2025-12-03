import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

export default function StatCard({ title, value, icon, color = theme.colors.primary }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
});
