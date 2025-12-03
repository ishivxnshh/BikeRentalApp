import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { plansService } from '../../services/plansService';
import RentalPlanCard from '../../components/RentalPlanCard';
import { theme } from '../../utils/theme';

export default function RentalPlansScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = await plansService.getAllPlans();
    if (response.success) {
      setPlans(response.data);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={plans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RentalPlanCard plan={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No rental plans available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: theme.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.textLight,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.xl,
  },
});
