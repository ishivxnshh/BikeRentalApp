import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { evService } from '../../services/evService';
import EVCard from '../../components/EVCard';
import { theme } from '../../utils/theme';

export default function EVListScreen() {
  const [evs, setEvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEVs();
  }, []);

  const fetchEVs = async () => {
    const response = await evService.getAllEV();
    if (response.success) {
      setEvs(response.data);
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
        data={evs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EVCard ev={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No EVs available</Text>}
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
