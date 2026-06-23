import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { colors, spacing, fontSize, fontWeight } from '../utils/theme';
import { generateId, validateTask } from '../utils/helpers';

export default function AddTaskScreen({ navigation }) {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const { isValid, errors: validationErrors } = validateTask({ title, description });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    const newTask = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    setTimeout(() => {
      setSaving(false);
      navigation.goBack();
    }, 300);
  };

  const handleTitleChange = text => {
    setTitle(text);
    if (errors.title) setErrors(prev => ({ ...prev, title: null }));
  };

  const handleDescriptionChange = text => {
    setDescription(text);
    if (errors.description) setErrors(prev => ({ ...prev, description: null }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>New Task</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <Text style={styles.sectionTitle}>Task Details</Text>

          <InputField
            label="Title *"
            value={title}
            onChangeText={handleTitleChange}
            placeholder="What needs to be done?"
            error={errors.title}
            maxLength={100}
            autoFocus
          />

          <InputField
            label="Description *"
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Add more details about this task..."
            error={errors.description}
            multiline
            numberOfLines={4}
            maxLength={500}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              The task will be created with "Pending" status. You can mark it as completed from the task list.
            </Text>
          </View>

          <Button
            title="Create Task"
            onPress={handleSave}
            loading={saving}
            size="lg"
            style={styles.saveBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
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
  cancelBtn: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    width: 60,
  },
  navTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  saveBtn: {
    marginTop: spacing.sm,
  },
});
