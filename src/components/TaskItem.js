import React, { useState } from 'react';

// One task = one row. This component shows either "view mode" (normal
// text + checkbox) or "edit mode" (a text input), depending on internal
// state. It receives the task data plus callback functions as props,
// and calls those callbacks whenever the user does something — it never
// changes the task list directly itself.
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.text);
  const [justCompleted, setJustCompleted] = useState(false);

  function handleToggle() {
    if (!task.completed) {
      // trigger the little burst animation only when *completing* a task
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 500);
    }
    onToggle(task.id);
  }

  function startEditing() {
    setDraftText(task.text);
    setIsEditing(true);
  }

  function saveEdit() {
    const trimmed = draftText.trim();
    if (trimmed === '') {
      onDelete(task.id); // editing down to nothing deletes the task
    } else {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') saveEdit();
    if (event.key === 'Escape') {
      setDraftText(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`task-item priority-${task.priority} ${task.completed ? 'is-complete' : ''}`}>
      <button
        className={`task-item__check ${justCompleted ? 'burst' : ''}`}
        onClick={handleToggle}
        aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
      >
        {task.completed && (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <path d="M4 12.5L9 17.5L20 6.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          className="task-item__edit-field"
          value={draftText}
          autoFocus
          onChange={(event) => setDraftText(event.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="task-item__text" onDoubleClick={startEditing}>
          {task.text}
        </span>
      )}

      <span className="task-item__priority-tag">{task.priority}</span>

      <div className="task-item__actions">
        {!isEditing && (
          <button className="task-item__icon-btn" onClick={startEditing} aria-label="Edit task">
            ✏️
          </button>
        )}
        <button className="task-item__icon-btn" onClick={() => onDelete(task.id)} aria-label="Delete task">
          🗑️
        </button>
      </div>
    </li>
  );
}
