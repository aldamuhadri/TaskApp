import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@taskapp_tasks';

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  loading: true,
  weather: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };
    case 'SET_WEATHER':
      return { ...state, weather: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    loadTasks();
    fetchWeather();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      saveTasks(state.tasks);
    }
  }, [state.tasks, state.loading]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      dispatch({ type: 'LOAD_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'LOAD_TASKS', payload: [] });
    }
  };

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {}
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weathercode&timezone=auto'
      );
      const data = await response.json();
      const temp = data.current.temperature_2m;
      const code = data.current.weathercode;

      let condition = 'Clear';
      let emoji = '☀️';
      if (code >= 61) { condition = 'Rainy'; emoji = '🌧️'; }
      else if (code >= 51) { condition = 'Drizzle'; emoji = '🌦️'; }
      else if (code >= 45) { condition = 'Foggy'; emoji = '🌫️'; }
      else if (code >= 3) { condition = 'Cloudy'; emoji = '☁️'; }
      else if (code >= 1) { condition = 'Partly Cloudy'; emoji = '⛅'; }

      dispatch({
        type: 'SET_WEATHER',
        payload: { temp, condition, emoji },
      });
    } catch (error) {}
  };

  const addTask = task => dispatch({ type: 'ADD_TASK', payload: task });
  const updateTask = task => dispatch({ type: 'UPDATE_TASK', payload: task });
  const deleteTask = id => dispatch({ type: 'DELETE_TASK', payload: id });
  const toggleTask = id => {
    const task = state.tasks.find(t => t.id === id);
    if (task) updateTask({ ...task, completed: !task.completed });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        weather: state.weather,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
