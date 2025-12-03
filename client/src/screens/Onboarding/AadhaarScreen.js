import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { onboardingService } from '../../services/onboardingService';
import InputField from '../../components/InputField';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';
import { selectImageSource } from '../../utils/imagePicker';

export default function AadhaarScreen({ navigation }) {
  const { user } = useAuth();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const image = await selectImageSource();
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleSubmit = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Aadhaar',
        text2: 'Please enter a valid 12-digit Aadhaar number',
      });
      return;
    }

    setLoading(true);
    const response = await onboardingService.submitAadhaar(user.id, aadhaarNumber, selectedImage);
    setLoading(false);

    if (!response.success) {
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: response.message,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Aadhaar submitted',
      text2: 'Your Aadhaar details have been saved',
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Aadhaar Verification</Text>
      <Text style={styles.subtitle}>Enter your 12-digit Aadhaar number</Text>

      <InputField
        label="Aadhaar Number"
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
        placeholder="XXXX XXXX XXXX"
        keyboardType="number-pad"
        maxLength={12}
      />

      <View style={styles.imageSection}>
        <Text style={styles.imageLabel}>Upload Aadhaar Card Image (Optional)</Text>
        
        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.changeImageButton} onPress={handleImagePick}>
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text style={styles.uploadButtonText}>📷 Select Image</Text>
          </TouchableOpacity>
        )}
      </View>

      <ButtonPrimary title="Submit" onPress={handleSubmit} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
  },
  imageSection: {
    marginBottom: theme.spacing.lg,
  },
  imageLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  uploadButton: {
    backgroundColor: theme.colors.light,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  changeImageButton: {
    backgroundColor: theme.colors.lightGray,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  changeImageText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
