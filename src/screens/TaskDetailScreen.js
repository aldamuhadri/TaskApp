import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';
import Button from '../components/Button';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '../utils/theme';
import { formatFullDate } from '../utils/helpers';

export default function TaskDetailScreen({ navigation, route }) {
  const { taskId } = route.params;
  const { tasks, toggleTask, deleteTask } = useTaskContext();
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundText}>Task not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Task Detail</Text>
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.7}>
          <Text style={styles.deleteBtn}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={[styles.statusBadge, task.completed ? styles.badgeDone : styles.badgePending]}>
          <Text style={[styles.statusText, task.completed ? styles.statusDone : styles.statusPending]}>
            {task.completed ? '✓  Completed' : '○  Pending'}
          </Text>
        </View>

        <Text style={[styles.title, task.completed && styles.titleDone]}>
          {task.title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>🗓</Text>
          <Text style={styles.metaText}>{formatFullDate(task.createdAt)}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>
          {task.description || 'No description provided.'}
        </Text>

        <View style={styles.divider} />

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={[styles.infoValueBadge, task.completed ? styles.badgeDone : styles.badgePending]}>
              <Text style={[styles.infoValueText, task.completed ? styles.statusDone : styles.statusPending]}>
                {task.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.infoValue}>{formatFullDate(task.createdAt)}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>Task ID</Text>
            <Text style={styles.infoValue} numberOfLines={1}>#{task.id.slice(-8)}</Text>
          </View>
        </View>

        <Button
          title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          onPress={() => toggleTask(task.id)}
          variant={task.completed ? 'ghost' : 'primary'}
          size="lg"
          style={styles.toggleBtn}
        />

        <Button
          title="Delete Task"
          onPress={handleDelete}
          variant="danger"
          size="lg"
          style={styles.deleteTaskBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backBtn: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  navTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  deleteBtn: {
    fontSize: fontSize.md,
    color: colors.danger,
    fontWeight: fontWeight.medium,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  badgePending: {
    backgroundColor: colors.primaryLight,
  },
  badgeDone: {
    backgroundColor: colors.successLight,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  statusPending: {
    color: colors.primary,
  },
  statusDone: {
    color: colors.success,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadow.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium,
    flex: 1,
    textAlign: 'right',
  },
  infoValueBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  infoValueText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  toggleBtn: {
    marginBottom: spacing.sm,
  },
  deleteTaskBtn: {
    marginTop: spacing.xs,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundEmoji: {
    fontSize: 48,
  },
  notFoundText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
});
