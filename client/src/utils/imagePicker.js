import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

/**
 * Request camera permissions
 */
const requestCameraPermissions = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return false;
    }
  }
  return true;
};

/**
 * Request media library permissions
 */
const requestMediaLibraryPermissions = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Media library permission is required to select photos');
      return false;
    }
  }
  return true;
};

/**
 * Pick an image from gallery
 * @returns {Promise<Object|null>} Image object with uri, type, name or null if cancelled
 */
export const pickImage = async () => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      return {
        uri: asset.uri,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
      };
    }

    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Failed to pick image');
    return null;
  }
};

/**
 * Take a photo using camera
 * @returns {Promise<Object|null>} Image object with uri, type, name or null if cancelled
 */
export const takePhoto = async () => {
  try {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      return {
        uri: asset.uri,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
      };
    }

    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    Alert.alert('Error', 'Failed to take photo');
    return null;
  }
};

/**
 * Show action sheet to choose between camera and gallery
 * @returns {Promise<Object|null>} Image object with uri, type, name or null if cancelled
 */
export const selectImageSource = () => {
  return new Promise((resolve) => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const photo = await takePhoto();
            resolve(photo);
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            const image = await pickImage();
            resolve(image);
          },
        },
        {
          text: 'Cancel',
          onPress: () => resolve(null),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  });
};
