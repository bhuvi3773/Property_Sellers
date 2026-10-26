import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal, Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export default function PropertyCard({ property, viewMode = 'grid' }) {
  const { toggleFavourite, isFavourite, toggleCompare, isInCompare } = useRealEstate();

  if (!property) return null;

  const favourited = isFavourite(property.id);
  const inCompare = isInCompare(property.id);

  return (
    <article className={`property-card ${viewMode === 'list' ? 'card-list-view' : ''} reveal-init`}>
      {/* Media Box */}
      <div className="card-media-box">
        <Link to={`/property/${property.slug}`} aria-label={`View details for ${property.title}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="card-img"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="card-badges-row">
          <span className={`badge ${property.listingType === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
            For {property.listingType === 'sale' ? 'Sale' : 'Lease'}
          </span>
          {property.isNew && <span className="badge badge-new">Newly Listed</span>}
        </div>

        {/* Action Overlays */}
        <div className="card-actions-overlay">
          {/* Favourite Toggle */}
          <button
            onClick={() => toggleFavourite(property.id)}
            className={`card-action-btn ${favourited ? 'is-active' : ''}`}
            title={favourited ? 'Remove from saved portfolio' : 'Save to private portfolio'}
            aria-label={favourited ? 'Remove from saved' : 'Save to portfolio'}
          >
            <Heart size={16} fill={favourited ? "var(--accent-gold)" : "none"} />
          </button>

          {/* Compare Toggle */}
          <button
            onClick={() => toggleCompare(property.id)}
            className={`card-action-btn ${inCompare ? 'is-active' : ''}`}
            title={inCompare ? 'Remove from comparison' : 'Add to comparison matrix'}
            aria-label={inCompare ? 'Remove from comparison' : 'Add to compare'}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="card-content">
        <div className="card-location-meta">
          <MapPin size={12} color="var(--accent-gold)" />
          <span>{property.location.locality}, {property.location.city}</span>
        </div>

        <Link to={`/property/${property.slug}`}>
          <h3 className="card-title">{property.title}</h3>
        </Link>
        
        <p className="card-tagline">{property.tagline}</p>

        {/* Specs Row */}
        <div className="card-specs-row">
          <div className="spec-item" title={`${property.bedrooms} Bedrooms`}>
            <Bed size={15} color="var(--accent-brass)" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="spec-item" title={`${property.bathrooms} Bathrooms`}>
            <Bath size={15} color="var(--accent-brass)" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="spec-item" title={`${property.areaSqFt.toLocaleString()} Square Feet`}>
            <Maximize2 size={15} color="var(--accent-brass)" />
            <span>{property.areaSqFt.toLocaleString()} sq ft</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="card-price-bar">
          <div className="card-price">{property.formattedPrice}</div>
          <Link to={`/property/${property.slug}`} className="card-detail-cta">
            <span>Explore</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
