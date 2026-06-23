import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight } from '../utils/theme';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  autoFocus = false,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoFocus={autoFocus}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      <View style={styles.footer}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <View />
        )}
        {maxLength && (
          <Text style={styles.counter}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  multiline: {
    minHeight: 100,
    paddingTop: spacing.sm + 2,
  },
  inputError: {
    borderColor: colors.danger,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    minHeight: 18,
  },
  error: {
    fontSize: fontSize.xs,
    color: colors.danger,
    fontWeight: fontWeight.medium,
  },
  counter: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
