import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { issuesService } from '../../services/issuesService';
import { theme } from '../../utils/theme';

export default function IssueCategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await issuesService.getCategories();
    if (response.success) {
      setCategories(response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Issue</Text>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('SubmitIssue', { category: item })}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    padding: theme.spacing.md,
  },
  list: {
    padding: theme.spacing.md,
  },
  categoryCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
});
