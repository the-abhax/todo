import React, { useState, useMemo, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import StatusBar from './components/StatusBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

// App is the "parent" component. It owns the actual task data (the
// single source of truth) and passes both the data and the functions
// that change that data down to its children as props. This top-down
// flow — state lives in one place, changes flow back up through
// callbacks — is the central pattern in React.
export default function App() {
  const [tasks, setTasks] = useLocalStorage('clarity-tasks', []);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useLocalStorage('clarity-theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function addTask(text, priority) {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    // never mutate state directly — always create a new array
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id, newText) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  // useMemo avoids recalculating the filtered list unless tasks or
  // filter actually change — a small performance habit, not required
  // for an app this size, but good practice to learn early.
  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <div className="app-header__brand">
            <span className="app-header__mark">✓</span>
            <h1>Clarity</h1>
          </div>
          <p className="app-header__tagline">Turn thinking into doing.</p>
        </header>

        <TaskInput onAddTask={addTask} />

        <StatusBar
          total={tasks.length}
          completedCount={completedCount}
          filter={filter}
          onFilterChange={setFilter}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );
}
