import React from 'react';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { CATEGORIES, LOCATIONS, AMENITY_OPTIONS } from '../../data/properties';

export default function FilterDrawer({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobileDrawer = false,
  isOpen = false,
  onCloseMobile = () => {}
}) {
  const content = (
    <div className="filter-drawer-container">
      <div className="filter-drawer-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={18} color="var(--accent-gold)" />
          <span>Filter Criteria</span>
        </div>
        <button
          onClick={onResetFilters}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.75rem', textTransform: 'none' }}
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Keyword Search */}
      <div className="filter-section">
        <label className="filter-section-title" htmlFor="filter-keyword">Search Term</label>
        <input
          id="filter-keyword"
          type="text"
          placeholder="e.g. Malabar Hill, Assagao, Haveli, Penthouse..."
          value={filters.keyword}
          onChange={(e) => onFilterChange('keyword', e.target.value)}
          className="input-field"
        />
      </div>

      {/* Location */}
      <div className="filter-section">
        <label className="filter-section-title" htmlFor="filter-loc">Location</label>
        <select
          id="filter-loc"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="select-field"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="filter-section">
        <label className="filter-section-title" htmlFor="filter-cat">Architectural Style</label>
        <select
          id="filter-cat"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="select-field"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="filter-section">
        <div className="form-row">
          <div>
            <label className="filter-section-title" htmlFor="filter-beds">Beds</label>
            <select
              id="filter-beds"
              value={filters.minBeds}
              onChange={(e) => onFilterChange('minBeds', e.target.value)}
              className="select-field"
            >
              <option value="any">Any</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
              <option value="6">6+ Beds</option>
            </select>
          </div>
          <div>
            <label className="filter-section-title" htmlFor="filter-baths">Baths</label>
            <select
              id="filter-baths"
              value={filters.minBaths}
              onChange={(e) => onFilterChange('minBaths', e.target.value)}
              className="select-field"
            >
              <option value="any">Any</option>
              <option value="4">4+ Baths</option>
              <option value="5">5+ Baths</option>
              <option value="6">6+ Baths</option>
            </select>
          </div>
        </div>
      </div>

      {/* Luxury Amenities Checkboxes */}
      <div className="filter-section" style={{ borderBottom: 'none' }}>
        <span className="filter-section-title">Curated Amenities</span>
        <div className="amenity-checkbox-grid">
          {AMENITY_OPTIONS.slice(0, 8).map((amenity) => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.amenities, amenity]
                    : filters.amenities.filter((a) => a !== amenity);
                  onFilterChange('amenities', updated);
                }}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {isMobileDrawer && (
        <button onClick={onCloseMobile} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
          Show {totalResults} Residences
        </button>
      )}
    </div>
  );

  if (isMobileDrawer) {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onCloseMobile}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button onClick={onCloseMobile} className="modal-close-btn" aria-label="Close Filter Drawer">
            <X size={20} />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
}
