import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export default function EVCard({ ev, onPress }) {
  const getChargingColor = (status) => {
    switch (status) {
      case 'charging':
        return theme.colors.warning;
      case 'full':
        return theme.colors.success;
      case 'idle':
      default:
        return theme.colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{ev.name}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Speed:</Text>
        <Text style={styles.value}>{ev.speed} km/h</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Battery:</Text>
        <Text style={styles.value}>{ev.batteryPercent}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Range:</Text>
        <Text style={styles.value}>{ev.rentalRange} km</Text>
      </View>
      {ev.chargingStatus && (
        <View style={[styles.chargingBadge, { backgroundColor: getChargingColor(ev.chargingStatus) }]}>
          <Text style={styles.chargingText}>{ev.chargingStatus.toUpperCase()}</Text>
        </View>
      )}
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
  chargingBadge: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  chargingText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
});
