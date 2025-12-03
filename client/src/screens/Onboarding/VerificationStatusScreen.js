import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { onboardingService } from '../../services/onboardingService';
import { theme } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationStatusScreen() {
  const { user } = useAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedImages, setExpandedImages] = useState({
    aadhaar: false,
    pan: false,
    dl: false,
    bank: false,
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const response = await onboardingService.getOnboardingStatus(user.id);
    if (response.success) {
      setStatus(response.data);
    }
    setLoading(false);
  };

  const toggleImageExpanded = (type) => {
    setExpandedImages((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const renderStatusItem = (label, verified, imageUrl, imageType) => (
    <View style={styles.statusItem}>
      <View style={styles.statusRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.statusBadge}>
          <Ionicons
            name={verified ? 'checkmark-circle' : 'time-outline'}
            size={20}
            color={verified ? theme.colors.success : theme.colors.warning}
          />
          <Text style={[styles.statusText, { color: verified ? theme.colors.success : theme.colors.warning }]}>
            {verified ? 'Verified' : 'Pending'}
          </Text>
        </View>
      </View>
      
      {imageUrl && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => toggleImageExpanded(imageType)}>
            <Image 
              source={{ uri: imageUrl }} 
              style={expandedImages[imageType] ? styles.imageExpanded : styles.imageThumbnail} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.imageHint}>
            {expandedImages[imageType] ? 'Tap to collapse' : 'Tap to expand'}
          </Text>
        </View>
      )}
    </View>
  );

  const getOverallStatusColor = () => {
    if (!status) return theme.colors.gray;
    switch (status.onboardingStatus) {
      case 'verified':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      default:
        return theme.colors.gray;
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!status) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No status data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Verification Status</Text>
      
      <View style={[styles.overallCard, { borderLeftColor: getOverallStatusColor() }]}>
        <Text style={styles.overallLabel}>Overall Status</Text>
        <Text style={[styles.overallStatus, { color: getOverallStatusColor() }]}>
          {status.onboardingStatus.toUpperCase()}
        </Text>
      </View>

      <View style={styles.detailsCard}>
        {renderStatusItem('Aadhaar', status.aadhaarVerified, status.aadhaarImageUrl, 'aadhaar')}
        {renderStatusItem('PAN', status.panVerified, status.panImageUrl, 'pan')}
        {renderStatusItem('Driving License', status.dlVerified, status.dlImageUrl, 'dl')}
        {renderStatusItem('Bank Account', status.bankVerified, status.bankImageUrl, 'bank')}
      </View>
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
  overallCard: {
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
  overallLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  overallStatus: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  imageThumbnail: {
    width: 120,
    height: 80,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  imageExpanded: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  imageHint: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
});
