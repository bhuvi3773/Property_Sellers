import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export default function FloatingCompareTray() {
  const { compareList, allProperties, toggleCompare, clearCompare } = useRealEstate();
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  // Hide tray on compare page itself or when empty
  if (location.pathname === '/compare' || compareList.length === 0) {
    return null;
  }

  const selectedProperties = allProperties.filter(p => compareList.includes(p.id));

  if (isMinimized) {
    return (
      <aside className="floating-compare-minimized" role="region" aria-label="Comparison Tray Minimized">
        <button
          onClick={() => setIsMinimized(false)}
          className="compare-min-pill"
          aria-label="Expand Comparison Matrix tray"
        >
          <SlidersHorizontal size={14} color="var(--accent-gold)" />
          <span className="compare-min-text">
            <strong>{compareList.length}</strong> in Matrix
          </span>
          <ChevronUp size={14} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="floating-compare-tray" role="region" aria-label="Comparison Tray">
      <div className="compare-tray-content">
        <div className="compare-tray-info">
          <SlidersHorizontal size={16} color="var(--accent-gold)" />
          <span className="compare-tray-count">
            <strong>{compareList.length}</strong>/4 for Comparison
          </span>
        </div>

        {/* Thumbnails */}
        <div className="compare-tray-thumbs">
          {selectedProperties.map(prop => (
            <div key={prop.id} className="compare-thumb-wrapper" title={prop.title}>
              <img src={prop.images[0]} alt={prop.title} className="compare-thumb-img" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompare(prop.id);
                }}
                className="compare-thumb-remove"
                aria-label={`Remove ${prop.title} from comparison`}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="compare-tray-actions">
          <Link to="/compare" className="btn btn-primary btn-sm">
            <span>Compare Matrix</span>
            <ArrowRight size={14} />
          </Link>
          <button onClick={clearCompare} className="btn btn-ghost btn-sm" title="Clear all">
            Clear
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="btn btn-ghost btn-sm btn-icon-only"
            title="Minimize tray"
            aria-label="Minimize comparison tray"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
