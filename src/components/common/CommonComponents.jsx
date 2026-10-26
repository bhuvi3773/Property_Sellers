import React from 'react';

export function SkeletonCard({ viewMode = 'grid' }) {
  return (
    <div className={`skeleton-property-card skeleton-${viewMode}`}>
      <div className="skeleton-img-box" />
      <div className="skeleton-content-box">
        <div className="skeleton-line skeleton-w30" />
        <div className="skeleton-line skeleton-w70" />
        <div className="skeleton-line skeleton-w50" />
        <div className="skeleton-meta-row">
          <div className="skeleton-line skeleton-w20" />
          <div className="skeleton-line skeleton-w20" />
          <div className="skeleton-line skeleton-w20" />
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No Residences Found",
  description = "No properties matched your current criteria. Consider adjusting your filters or resetting the search parameters.",
  actionText = "Reset All Filters",
  onAction = null
}) {
  return (
    <div className="empty-state-container reveal-init">
      <div className="empty-state-monogram">V</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {onAction && (
        <button onClick={onAction} className="btn btn-secondary">
          {actionText}
        </button>
      )}
    </div>
  );
}
