import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, fontSize, fontWeight, spacing } from '../utils/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : colors.primary}
        />
      ) : (
        <Text style={[styles.text, styles[`text_${variant}`], styles[`textSize_${size}`]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
  },
  danger: {
    backgroundColor: colors.dangerLight,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  size_sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  size_md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
  },
  size_lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  text: {
    fontWeight: fontWeight.semibold,
  },
  text_primary: {
    color: '#fff',
  },
  text_secondary: {
    color: colors.primary,
  },
  text_danger: {
    color: colors.danger,
  },
  text_ghost: {
    color: colors.textSecondary,
  },
  textSize_sm: {
    fontSize: fontSize.sm,
  },
  textSize_md: {
    fontSize: fontSize.md,
  },
  textSize_lg: {
    fontSize: fontSize.lg,
  },
});
