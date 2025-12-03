import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { issuesService } from '../../services/issuesService';
import InputField from '../../components/InputField';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../utils/theme';

export default function SubmitIssueScreen({ route, navigation }) {
  const { category } = route.params;
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Description',
        text2: 'Please enter a description',
      });
      return;
    }

    setLoading(true);
    const response = await issuesService.submitIssue(user.id, category, description);
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
      text1: 'Issue Reported',
      text2: 'Your issue has been submitted successfully',
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Report Issue</Text>
      <Text style={styles.category}>Category: {category}</Text>

      <InputField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the issue in detail"
        style={{ height: 120 }}
        multiline
      />

      <ButtonPrimary title="Submit Issue" onPress={handleSubmit} loading={loading} />
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
    marginBottom: theme.spacing.sm,
  },
  category: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    fontWeight: '600',
  },
});
