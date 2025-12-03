import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export default function IssueCard({ issue, onPress }) {
  const getStatusColor = (status) => {
    return status === 'resolved' ? theme.colors.success : theme.colors.warning;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.category}>{issue.category}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(issue.status) }]}>
          <Text style={styles.statusText}>{issue.status}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {issue.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
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
    marginBottom: theme.spacing.xs,
  },
  category: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
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
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
});
