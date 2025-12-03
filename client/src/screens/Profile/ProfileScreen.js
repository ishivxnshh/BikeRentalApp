import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { onboardingService } from '../../services/onboardingService';
import Loader from '../../components/Loader';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnboardingStatus();
  }, []);

  const fetchOnboardingStatus = async () => {
    const response = await onboardingService.getOnboardingStatus(user.id);
    if (response.success) {
      setOnboardingData(response.data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      default:
        return theme.colors.gray;
    }
  };

  if (loading) {
    return <Loader text="Loading profile..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color={theme.colors.primary} />
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.role}>{user?.role || 'Rider'}</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={theme.colors.textLight} />
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={theme.colors.textLight} />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email || 'Not provided'}</Text>
        </View>
      </View>

      {/* Verification Status Card */}
      {onboardingData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Verification Status</Text>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Overall Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(onboardingData.onboardingStatus) }]}>
              <Text style={styles.statusText}>
                {onboardingData.onboardingStatus?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.verificationGrid}>
            <View style={styles.verificationItem}>
              <Ionicons 
                name={onboardingData.aadhaarVerified ? 'checkmark-circle' : 'close-circle'} 
                size={24} 
                color={onboardingData.aadhaarVerified ? theme.colors.success : theme.colors.danger} 
              />
              <Text style={styles.verificationText}>Aadhaar</Text>
            </View>

            <View style={styles.verificationItem}>
              <Ionicons 
                name={onboardingData.panVerified ? 'checkmark-circle' : 'close-circle'} 
                size={24} 
                color={onboardingData.panVerified ? theme.colors.success : theme.colors.danger} 
              />
              <Text style={styles.verificationText}>PAN</Text>
            </View>

            <View style={styles.verificationItem}>
              <Ionicons 
                name={onboardingData.dlVerified ? 'checkmark-circle' : 'close-circle'} 
                size={24} 
                color={onboardingData.dlVerified ? theme.colors.success : theme.colors.danger} 
              />
              <Text style={styles.verificationText}>DL</Text>
            </View>

            <View style={styles.verificationItem}>
              <Ionicons 
                name={onboardingData.bankVerified ? 'checkmark-circle' : 'close-circle'} 
                size={24} 
                color={onboardingData.bankVerified ? theme.colors.success : theme.colors.danger} 
              />
              <Text style={styles.verificationText}>Bank</Text>
            </View>
          </View>
        </View>
      )}

      {/* KYC Images Card */}
      {onboardingData && (onboardingData.aadhaarImageUrl || onboardingData.panImageUrl || onboardingData.dlImageUrl || onboardingData.bankImageUrl) && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Uploaded Documents</Text>
          
          <View style={styles.imagesGrid}>
            {onboardingData.aadhaarImageUrl && (
              <View style={styles.imageItem}>
                <Image source={{ uri: onboardingData.aadhaarImageUrl }} style={styles.docImage} />
                <Text style={styles.imageName}>Aadhaar</Text>
              </View>
            )}

            {onboardingData.panImageUrl && (
              <View style={styles.imageItem}>
                <Image source={{ uri: onboardingData.panImageUrl }} style={styles.docImage} />
                <Text style={styles.imageName}>PAN</Text>
              </View>
            )}

            {onboardingData.dlImageUrl && (
              <View style={styles.imageItem}>
                <Image source={{ uri: onboardingData.dlImageUrl }} style={styles.docImage} />
                <Text style={styles.imageName}>DL</Text>
              </View>
            )}

            {onboardingData.bankImageUrl && (
              <View style={styles.imageItem}>
                <Image source={{ uri: onboardingData.bankImageUrl }} style={styles.docImage} />
                <Text style={styles.imageName}>Bank</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Actions */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <ButtonPrimary 
        title="Logout" 
        onPress={handleLogout}
        style={styles.logoutButton}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>BikeRental App v1.0.0</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  role: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textLight,
    textTransform: 'capitalize',
  },
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
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  infoLabel: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textLight,
    marginLeft: theme.spacing.sm,
  },
  infoValue: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statusLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    fontWeight: '600',
  },
  verificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  verificationItem: {
    alignItems: 'center',
    width: '25%',
    marginBottom: theme.spacing.sm,
  },
  verificationText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageItem: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  docImage: {
    width: '100%',
    height: 120,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  imageName: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  editButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  logoutButton: {
    backgroundColor: theme.colors.danger,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
});
