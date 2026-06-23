import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight } from '../utils/theme';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Done' },
];

export default function FilterTabs({ active, onChange, counts }) {
  return (
    <View style={styles.container}>
      {FILTERS.map(filter => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onChange(filter.key)}
          activeOpacity={0.75}
          style={[styles.tab, active === filter.key && styles.tabActive]}>
          <Text style={[styles.label, active === filter.key && styles.labelActive]}>
            {filter.label}
          </Text>
          {counts && counts[filter.key] !== undefined && (
            <View style={[styles.count, active === filter.key && styles.countActive]}>
              <Text style={[styles.countText, active === filter.key && styles.countTextActive]}>
                {counts[filter.key]}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: radius.full,
    padding: 3,
    gap: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    gap: 5,
  },
  tabActive: {
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  count: {
    backgroundColor: colors.border,
    borderRadius: radius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  countActive: {
    backgroundColor: colors.primaryLight,
  },
  countText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  countTextActive: {
    color: colors.primary,
  },
});
