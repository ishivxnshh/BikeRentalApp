import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import { theme } from '../../utils/theme';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEarnings();
    }
  }, [user]);

  const fetchEarnings = async () => {
    const response = await dashboardService.getEarnings(user.id);
    if (response.success) {
      setEarnings(response.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!earnings) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No earnings data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My Dashboard</Text>
      
      <StatCard
        title="Total Earnings"
        value={`₹${earnings.totalEarnings || 0}`}
        color={theme.colors.success}
      />
      
      <StatCard
        title="Wallet Balance"
        value={`₹${earnings.walletBalance || 0}`}
        color={theme.colors.primary}
      />
      
      <StatCard
        title="Total Orders"
        value={earnings.totalOrders || 0}
        color={theme.colors.info}
      />
      
      <StatCard
        title="Working Days"
        value={earnings.workingDays || 0}
        color={theme.colors.secondary}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.md,
  },
});
