# TaskApp

A React Native task management app built for the PRITECH React Native Technical Challenge.

## Features

### Core
- Task list screen with all tasks
- Add new task with title and description
- Mark task as completed / not completed
- Delete task with confirmation dialog
- Task detail view with full information
- Input validation with error messages
- Clean and simple UI with consistent design system
- Weather API integration (Open-Meteo) shown on home screen

### Bonus
- Search tasks by title and description
- Filter tasks by status (All / Pending / Done)
- Tasks persist locally using AsyncStorage
- Navigation between screens (Home, Add Task, Task Detail)

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native 0.74 | Mobile framework |
| JavaScript (ES6+) | Language |
| React Navigation v6 | Screen navigation |
| AsyncStorage | Local persistence |
| React Context + useReducer | State management |
| Open-Meteo API | Public API integration |

## Prerequisites

- Node.js >= 18
- React Native CLI environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- For iOS: Xcode + CocoaPods
- For Android: Android Studio + SDK

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/aldamuhadri/TaskApp.git
cd TaskApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. iOS — install pods

```bash
cd ios && pod install && cd ..
```

### 4. Start Metro

```bash
npm start
```

### 5. Run the app

```bash
# iOS
npm run ios

# Android
npm run android
```

## Public API

**Open-Meteo** — `https://api.open-meteo.com/v1/forecast`

Returns current weather data displayed on the home screen as a motivational widget. Falls back gracefully if the API is unavailable.

## Architecture

- **Context + useReducer** — lightweight global state without Redux
- **AsyncStorage** — tasks are saved automatically on every change
- **Reusable components** — Button, InputField, TaskCard, SearchBar, FilterTabs, EmptyState
- **Clean code** — no unnecessary dependencies, small focused components
