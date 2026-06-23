export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function formatFullDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function validateTask({ title, description }) {
  const errors = {};

  if (!title || title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters';
  }

  if (!description || description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (description.trim().length > 500) {
    errors.description = 'Description must be under 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
