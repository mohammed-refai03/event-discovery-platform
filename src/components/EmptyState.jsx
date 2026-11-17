import React from 'react';

function EmptyState({
  icon = 'fa-compass',
  title = 'No events found',
  message = 'There are no events matching your criteria at this moment.',
  actionLabel,
  onAction
}) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
