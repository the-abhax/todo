import React from 'react';

// A small status indicator: how many tasks are done out of the total,
// plus filter buttons (All / Active / Completed) and a theme toggle.
export default function StatusBar({ total, completedCount, filter, onFilterChange, theme, onToggleTheme }) {
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="status-bar">
      <div className="status-bar__progress">
        <div className="status-bar__ring" style={{ '--percent': percent }}>
          <span>{percent}%</span>
        </div>
        <div>
          <strong>{completedCount}</strong> of <strong>{total}</strong> tasks done
        </div>
      </div>

      <div className="status-bar__filters">
        {['all', 'active', 'completed'].map((option) => (
          <button
            key={option}
            className={`status-bar__filter-btn ${filter === option ? 'active' : ''}`}
            onClick={() => onFilterChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <button className="status-bar__theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}
