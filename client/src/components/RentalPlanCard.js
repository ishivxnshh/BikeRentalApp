import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export default function RentalPlanCard({ plan, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{plan.name}</Text>
      <Text style={styles.price}>₹{plan.price}</Text>
      {plan.description && <Text style={styles.description}>{plan.description}</Text>}
      <View style={styles.row}>
        <Text style={styles.label}>Speed:</Text>
        <Text style={styles.value}>{plan.speed} km/h</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Range:</Text>
        <Text style={styles.value}>{plan.range} km</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  value: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '500',
  },
});
