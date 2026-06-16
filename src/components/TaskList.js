import React from 'react';
import TaskItem from './TaskItem';

// TaskList just maps over an array and renders one TaskItem per task.
// The "key" prop is required by React whenever you render a list — it
// helps React track which item is which across re-renders.
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <span className="task-list__empty-icon">🌤️</span>
        <p>Nothing here. Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
