import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import EmptyState from '../components/EmptyState';
import { colors, spacing, fontSize, fontWeight, shadow, radius } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const { tasks, weather, loading } = useTaskContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (filter === 'pending') result = result.filter(t => !t.completed);
    if (filter === 'completed') result = result.filter(t => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tasks, filter, search]);

  const handleAddTask = () => navigation.navigate('AddTask');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>My Tasks</Text>
          <Text style={styles.subGreeting}>
            {counts.pending === 0
              ? 'All done! 🎉'
              : `${counts.pending} task${counts.pending !== 1 ? 's' : ''} pending`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddTask}
          activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {weather && (
        <View style={styles.weatherCard}>
          <Text style={styles.weatherEmoji}>{weather.emoji}</Text>
          <View>
            <Text style={styles.weatherTitle}>Today's Weather</Text>
            <Text style={styles.weatherText}>
              {weather.condition} · {weather.temp}°C — A great day to get things done!
            </Text>
          </View>
        </View>
      )}

      <View style={styles.searchRow}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />
      </View>

      <View style={styles.filterRow}>
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              filter={filter}
              searchQuery={search}
              onAddTask={handleAddTask}
            />
          ) : null
        }
        contentContainerStyle={[
          styles.list,
          filteredTasks.length === 0 && styles.listEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.md,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: fontWeight.regular,
  },
  weatherCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  weatherEmoji: {
    fontSize: 32,
  },
  weatherTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  weatherText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    lineHeight: 18,
  },
  searchRow: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  filterRow: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flex: 1,
  },
});
