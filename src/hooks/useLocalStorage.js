import { useState, useEffect } from 'react';

// A custom hook is just a function starting with "use" that lets you
// reuse stateful logic across components. This one behaves exactly like
// useState, but it also reads from and writes to localStorage, so data
// survives a page refresh or the browser closing.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Could not write to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
