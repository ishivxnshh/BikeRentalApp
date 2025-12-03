import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export default function VehicleCard({ vehicle, onPress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ON':
        return theme.colors.success;
      case 'MOVING':
        return theme.colors.info;
      case 'OFF':
      default:
        return theme.colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{vehicle.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vehicle.status) }]}>
          <Text style={styles.statusText}>{vehicle.status}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{vehicle.type}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Speed:</Text>
        <Text style={styles.value}>{vehicle.speed} km/h</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Battery:</Text>
        <Text style={styles.value}>{vehicle.batteryPercent}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Range:</Text>
        <Text style={styles.value}>{vehicle.range} km</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
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
