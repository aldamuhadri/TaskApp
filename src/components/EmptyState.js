import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../utils/theme';
import Button from './Button';

export default function EmptyState({ filter, searchQuery, onAddTask }) {
  let emoji = '📋';
  let title = 'No tasks yet';
  let subtitle = 'Tap the button below to add your first task';
  let showAdd = true;

  if (searchQuery) {
    emoji = '🔍';
    title = 'No results found';
    subtitle = `No tasks match "${searchQuery}"`;
    showAdd = false;
  } else if (filter === 'completed') {
    emoji = '✅';
    title = 'No completed tasks';
    subtitle = 'Complete a task to see it here';
    showAdd = false;
  } else if (filter === 'pending') {
    emoji = '🎉';
    title = 'All done!';
    subtitle = 'You have no pending tasks';
    showAdd = false;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {showAdd && (
        <Button
          title="Add First Task"
          onPress={onAddTask}
          style={styles.btn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  btn: {
    marginTop: spacing.sm,
  },
});
