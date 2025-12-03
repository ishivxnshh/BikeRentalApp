import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { useLoading } from '../context/LoadingContext';
import { theme } from '../utils/theme';

export default function FullscreenLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <Modal transparent visible={loading} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
