import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import PropertyCard from './PropertyCard';

export default function SimilarProperties({ currentPropertyId, category, city }) {
  const { allProperties } = useRealEstate();

  // Find properties matching category or city, excluding current
  const similar = allProperties
    .filter(p => p.id !== currentPropertyId)
    .filter(p => p.category === category || p.location.city === city)
    .slice(0, 3);

  // If fewer than 3, pad with others
  const paddedSimilar = similar.length >= 3 
    ? similar 
    : [
        ...similar,
        ...allProperties.filter(p => p.id !== currentPropertyId && !similar.some(s => s.id === p.id)).slice(0, 3 - similar.length)
      ];

  if (paddedSimilar.length === 0) return null;

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="editorial-tag" style={{ justifyContent: 'center' }}>Curated Parallels</div>
          <h2 className="section-title">Similar Architectural Offerings</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Complementary estates sharing comparable historic prestige, materials, and volumetric scale.
          </p>
        </div>

        <div className="properties-grid reveal-stagger">
          {paddedSimilar.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
