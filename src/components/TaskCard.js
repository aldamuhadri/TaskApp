import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '../utils/theme';
import { formatDate } from '../utils/helpers';
import { useTaskContext } from '../context/TaskContext';

export default function TaskCard({ task, onPress }) {
  const { toggleTask, deleteTask } = useTaskContext();

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(task.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, task.completed && styles.cardCompleted]}>
      <View style={[styles.accent, task.completed && styles.accentCompleted]} />
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => toggleTask(task.id)}
            activeOpacity={0.7}
            style={[styles.checkbox, task.completed && styles.checkboxDone]}>
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <View style={styles.textArea}>
            <Text
              style={[styles.title, task.completed && styles.titleDone]}
              numberOfLines={1}>
              {task.title}
            </Text>
            {task.description ? (
              <Text style={styles.description} numberOfLines={2}>
                {task.description}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.7}
            style={styles.deleteBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={[styles.badge, task.completed ? styles.badgeDone : styles.badgePending]}>
            <Text style={[styles.badgeText, task.completed ? styles.badgeTextDone : styles.badgeTextPending]}>
              {task.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs + 2,
    flexDirection: 'row',
    overflow: 'hidden',
    ...shadow.sm,
  },
  cardCompleted: {
    opacity: 0.75,
  },
  accent: {
    width: 4,
    backgroundColor: colors.primary,
  },
  accentCompleted: {
    backgroundColor: colors.success,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: fontWeight.bold,
  },
  textArea: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 3,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  deleteBtn: {
    padding: 4,
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: 14,
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgePending: {
    backgroundColor: colors.primaryLight,
  },
  badgeDone: {
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  badgeTextPending: {
    color: colors.primary,
  },
  badgeTextDone: {
    color: colors.success,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
