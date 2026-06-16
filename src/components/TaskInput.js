import React, { useState } from 'react';

// This component owns ONE job: capture text from the user and hand it
// up to the parent via the onAddTask function (passed in as a prop).
// It does not know or care how the parent stores tasks — that's the
// parent's responsibility. This separation is the core idea of React.
export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser's default page-reload form behavior
    const trimmed = text.trim();
    if (trimmed === '') return; // ignore empty submissions

    onAddTask(trimmed, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input__field"
        placeholder="Add a task… e.g. Write agenda for Monday's meeting"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="New task"
      />
      <select
        className="task-input__priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="task-input__submit">
        Add task
      </button>
    </form>
  );
}
