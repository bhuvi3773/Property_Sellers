import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X, Check, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EmptyState } from '../components/common/CommonComponents';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { AMENITY_OPTIONS } from '../data/properties';

export default function ComparePage() {
  const { compareList, allProperties, toggleCompare, clearCompare, openEnquiry } = useRealEstate();
  const [highlightDiffs, setHighlightDiffs] = useState(false);
  useScrollReveal([compareList]);

  const propertiesToCompare = allProperties.filter(p => compareList.includes(p.id));

  // Helper to determine if values in a row differ
  const valuesDiffer = (extractor) => {
    if (propertiesToCompare.length < 2) return false;
    const firstVal = extractor(propertiesToCompare[0]);
    return propertiesToCompare.some(p => extractor(p) !== firstVal);
  };

  return (
    <div className="compare-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container-wide">
        <Breadcrumbs items={[{ label: 'Comparison Matrix' }]} />

        {/* Header */}
        <div className="section-header-split" style={{ marginBottom: '2.5rem' }}>
          <div>
            <div className="editorial-tag">Analytical Evaluation</div>
            <h1 className="section-title">Residence Comparison Matrix</h1>
            <p className="section-subtitle">
              Side-by-side architectural, spatial, and financial specification analysis for up to four candidate properties.
            </p>
          </div>

          {propertiesToCompare.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label className="checkbox-label" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', background: 'var(--bg-secondary)' }}>
                <input
                  type="checkbox"
                  checked={highlightDiffs}
                  onChange={(e) => setHighlightDiffs(e.target.checked)}
                />
                <span>Highlight Differences</span>
              </label>

              <button onClick={clearCompare} className="btn btn-secondary btn-sm">
                <Trash2 size={14} />
                <span>Clear Matrix</span>
              </button>
            </div>
          )}
        </div>

        {propertiesToCompare.length === 0 ? (
          <EmptyState
            title="No Residences in Comparison Matrix"
            description="You have not selected any residences to compare. Navigate to our portfolio and click the comparison sliders icon on up to four properties to analyze their specifications."
            actionText="Browse Available Residences"
            onAction={() => window.location.href = '/buy'}
          />
        ) : (
          <div className="compare-matrix-wrapper reveal-init">
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '200px' }}>Residence Overview</th>
                  {propertiesToCompare.map((prop) => (
                    <td key={prop.id} className="compare-prop-header" style={{ width: `${100 / propertiesToCompare.length}%` }}>
                      <button
                        onClick={() => toggleCompare(prop.id)}
                        className="compare-remove-cell-btn"
                        title="Remove from matrix"
                        aria-label={`Remove ${prop.title}`}
                      >
                        <X size={14} />
                      </button>

                      <Link to={`/property/${prop.slug}`}>
                        <img src={prop.images[0]} alt={prop.title} className="compare-header-img" />
                      </Link>

                      <Link to={`/property/${prop.slug}`}>
                        <h4 className="compare-prop-title">{prop.title}</h4>
                      </Link>
                      
                      <div className="compare-prop-price">{prop.formattedPrice}</div>
                      
                      <button
                        onClick={() => openEnquiry(prop, 'schedule')}
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '0.85rem', width: '100%' }}
                      >
                        <span>Schedule Viewing</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Acquisition Type */}
                <tr className={highlightDiffs && valuesDiffer(p => p.listingType) ? 'diff-row' : ''}>
                  <th>Listing Nature</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>
                      <span className={`badge ${p.listingType === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
                        For {p.listingType === 'sale' ? 'Sale' : 'Lease'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr className={highlightDiffs && valuesDiffer(p => p.location.city) ? 'diff-row' : ''}>
                  <th>Locality & City</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.location.locality}, {p.location.city}</td>
                  ))}
                </tr>

                {/* Architectural Era */}
                <tr className={highlightDiffs && valuesDiffer(p => p.architecturalStyle) ? 'diff-row' : ''}>
                  <th>Architectural Style</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}><strong>{p.architecturalStyle}</strong></td>
                  ))}
                </tr>

                {/* Floor Area */}
                <tr className={highlightDiffs && valuesDiffer(p => p.areaSqFt) ? 'diff-row' : ''}>
                  <th>Interior Area</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.areaSqFt.toLocaleString()} sq ft</td>
                  ))}
                </tr>

                {/* Price per Sq Ft in INR */}
                <tr>
                  <th>Price Metric</th>
                  {propertiesToCompare.map(p => {
                    const pricePerSqFt = Math.round(p.price / p.areaSqFt);
                    return (
                      <td key={p.id}>
                        {p.listingType === 'sale' ? `₹${pricePerSqFt.toLocaleString()} / sq ft` : `₹${Math.round(p.price / p.areaSqFt).toLocaleString()} / sq ft / mo`}
                      </td>
                    );
                  })}
                </tr>

                {/* Bedrooms & Bathrooms */}
                <tr className={highlightDiffs && valuesDiffer(p => p.bedrooms) ? 'diff-row' : ''}>
                  <th>Bedrooms</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.bedrooms} Suites</td>
                  ))}
                </tr>

                <tr className={highlightDiffs && valuesDiffer(p => p.bathrooms) ? 'diff-row' : ''}>
                  <th>Bathrooms</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.bathrooms} Baths</td>
                  ))}
                </tr>

                {/* Year Erected */}
                <tr className={highlightDiffs && valuesDiffer(p => p.yearBuilt) ? 'diff-row' : ''}>
                  <th>Year Built</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.yearBuilt}</td>
                  ))}
                </tr>

                {/* Furnishing */}
                <tr className={highlightDiffs && valuesDiffer(p => p.furnishing) ? 'diff-row' : ''}>
                  <th>Furnishing Level</th>
                  {propertiesToCompare.map(p => (
                    <td key={p.id}>{p.furnishing}</td>
                  ))}
                </tr>

                {/* Key Amenities Matrix Rows */}
                {AMENITY_OPTIONS.slice(0, 6).map(amenity => (
                  <tr key={amenity} className={highlightDiffs && valuesDiffer(p => p.amenities.includes(amenity)) ? 'diff-row' : ''}>
                    <th>{amenity}</th>
                    {propertiesToCompare.map(p => {
                      const hasAmenity = p.amenities.includes(amenity);
                      return (
                        <td key={p.id}>
                          {hasAmenity ? (
                            <Check size={18} color="var(--accent-gold)" />
                          ) : (
                            <Minus size={18} color="var(--text-dim)" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
