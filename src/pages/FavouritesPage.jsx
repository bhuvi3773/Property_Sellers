import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PropertyCard from '../components/property/PropertyCard';
import { EmptyState } from '../components/common/CommonComponents';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function FavouritesPage() {
  const { favourites, allProperties, toggleFavourite } = useRealEstate();
  useScrollReveal([favourites]);

  const savedProperties = allProperties.filter(p => favourites.includes(p.id));

  return (
    <div className="favourites-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Saved Private Portfolio' }]} />

        {/* Page Header */}
        <div className="section-header-split" style={{ marginBottom: '3rem' }}>
          <div>
            <div className="editorial-tag">Your Curated Dossier</div>
            <h1 className="section-title">Saved Portfolio</h1>
            <p className="section-subtitle">
              Residences earmarked for private review, private viewings, or family office consultation.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {savedProperties.length} {savedProperties.length === 1 ? 'Residence' : 'Residences'} Stored
              </span>
            </div>
          )}
        </div>

        {savedProperties.length === 0 ? (
          <EmptyState
            title="Your Portfolio is Currently Empty"
            description="You have not saved any residences to your private portfolio. Explore our acquisitions or leases and click the heart icon on any residence to bookmark it."
            actionText="Discover Available Residences"
            onAction={() => window.location.href = '/buy'}
          />
        ) : (
          <div className="properties-grid reveal-stagger">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
