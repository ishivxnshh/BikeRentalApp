import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { vehicleService } from '../../services/vehicleService';
import VehicleCard from '../../components/VehicleCard';
import { theme } from '../../utils/theme';

export default function VehicleListScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const response = await vehicleService.getAllVehicles();
    if (response.success) {
      setVehicles(response.data);
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
        data={vehicles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item._id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No vehicles available</Text>}
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
