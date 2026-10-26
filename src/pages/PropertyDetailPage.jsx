import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  SlidersHorizontal,
  Share2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Clock,
  Sparkles,
  Check,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PropertyGallery from '../components/property/PropertyGallery';
import SimilarProperties from '../components/property/SimilarProperties';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const { allProperties, toggleFavourite, isFavourite, toggleCompare, isInCompare, showToast, openEnquiry } = useRealEstate();
  useScrollReveal([slug]);

  const property = allProperties.find(p => p.slug === slug);

  if (!property) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="section-title">Residence Not Found</h1>
        <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
          The residence you requested could not be located in our active or private archives.
        </p>
        <Link to="/buy" className="btn btn-primary">
          <span>Return to Available Portfolio</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const favourited = isFavourite(property.id);
  const inCompare = isInCompare(property.id);

  const handleShare = async () => {
    const shareData = {
      title: `${property.title} — Vault & Vista`,
      text: property.tagline,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Residence dossier link copied to your clipboard.', 'success');
      } catch (err) {
        showToast('Failed to copy link.', 'warn');
      }
    }
  };

  return (
    <div className="property-detail-page" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)', paddingBottom: '6rem' }}>
      <div className="container-wide">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: property.listingType === 'sale' ? 'Residences for Sale' : 'Private Leases', path: property.listingType === 'sale' ? '/buy' : '/rent' },
            { label: property.location.city, path: `/buy?location=${encodeURIComponent(property.location.city)}` },
            { label: property.title }
          ]}
        />

        {/* Header Title & Actions Strip */}
        <div className="property-header-strip reveal-init">
          <div className="property-title-block">
            <div className="card-badges-row" style={{ position: 'static', marginBottom: '0.75rem' }}>
              <span className={`badge ${property.listingType === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
                For {property.listingType === 'sale' ? 'Sale' : 'Lease'}
              </span>
              <span className="badge badge-new">{property.category}</span>
              {property.isNew && <span className="badge badge-new">Newly Listed</span>}
            </div>

            <h1 className="property-main-title">{property.title}</h1>
            <p className="property-address-text">
              <MapPin size={16} color="var(--accent-gold)" />
              <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
            </p>
          </div>

          {/* Pricing and Action Buttons */}
          <div className="property-pricing-actions">
            <div className="property-main-price">{property.formattedPrice}</div>
            
            <div className="property-action-buttons-row">
              <button
                onClick={() => toggleFavourite(property.id)}
                className={`btn btn-secondary btn-sm ${favourited ? 'is-active' : ''}`}
                title={favourited ? 'Remove from Saved' : 'Save Residence'}
                aria-label={favourited ? 'Saved in portfolio' : 'Save to portfolio'}
              >
                <Heart size={16} fill={favourited ? "var(--accent-gold)" : "none"} color={favourited ? "var(--accent-gold)" : "currentColor"} />
                <span>{favourited ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => toggleCompare(property.id)}
                className={`btn btn-secondary btn-sm ${inCompare ? 'is-active' : ''}`}
                title="Add to comparison matrix"
                aria-label="Compare residence"
              >
                <SlidersHorizontal size={16} color={inCompare ? "var(--accent-gold)" : "currentColor"} />
                <span>{inCompare ? 'In Matrix' : 'Compare'}</span>
              </button>

              <button
                onClick={handleShare}
                className="btn btn-secondary btn-sm"
                title="Share residence dossier"
                aria-label="Share property"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Photo Gallery Spread with Lightbox */}
        <PropertyGallery images={property.images} propertyTitle={property.title} />

        {/* Specifications Highlight Ribbon */}
        <div className="property-specs-ribbon reveal-init">
          <div className="ribbon-spec-box">
            <Bed size={20} color="var(--accent-gold)" />
            <div>
              <span className="ribbon-spec-value">{property.bedrooms}</span>
              <span className="ribbon-spec-label">Bedrooms</span>
            </div>
          </div>
          <div className="ribbon-spec-box">
            <Bath size={20} color="var(--accent-gold)" />
            <div>
              <span className="ribbon-spec-value">{property.bathrooms}</span>
              <span className="ribbon-spec-label">Bathrooms</span>
            </div>
          </div>
          <div className="ribbon-spec-box">
            <Maximize2 size={20} color="var(--accent-gold)" />
            <div>
              <span className="ribbon-spec-value">{property.areaSqFt.toLocaleString()}</span>
              <span className="ribbon-spec-label">Interior Sq Ft</span>
            </div>
          </div>
          <div className="ribbon-spec-box">
            <Clock size={20} color="var(--accent-gold)" />
            <div>
              <span className="ribbon-spec-value">{property.yearBuilt}</span>
              <span className="ribbon-spec-label">Year Erected</span>
            </div>
          </div>
          <div className="ribbon-spec-box">
            <Compass size={20} color="var(--accent-gold)" />
            <div>
              <span className="ribbon-spec-value">{property.architecturalStyle}</span>
              <span className="ribbon-spec-label">Architectural Era</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Narrative + Sidebar Sticky Agent Card) */}
        <div className="property-content-layout">
          {/* Left Column: Narrative & Amenities */}
          <div className="property-narrative-column">
            {/* Tagline / Subtitle */}
            <div className="property-editorial-lead reveal-init">
              <h3>"{property.tagline}"</h3>
            </div>

            {/* Narrative Description */}
            <div className="property-description-body reveal-init">
              {property.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="property-highlights-card reveal-init">
              <h3 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                Curated Highlights
              </h3>
              <ul className="highlights-list">
                {property.highlights.map((highlight, idx) => (
                  <li key={idx} className="highlight-item">
                    <Check size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comprehensive Amenities Checklist */}
            <div className="property-amenities-section reveal-init">
              <h3 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                Private Amenities & Infrastructure
              </h3>
              <div className="amenities-pills-grid">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="amenity-pill-card">
                    <Sparkles size={14} color="var(--accent-gold)" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Points of Interest */}
            {property.nearby && property.nearby.length > 0 && (
              <div className="property-nearby-section reveal-init">
                <h3 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                  Locality & Distances
                </h3>
                <div className="nearby-list">
                  {property.nearby.map((place, idx) => (
                    <div key={idx} className="nearby-row">
                      <span className="nearby-place">{place.place}</span>
                      <span className="nearby-distance">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dedicated Agent Card & Inquiry Action */}
          <aside className="property-agent-sidebar">
            <div className="agent-profile-card reveal-init">
              <div className="agent-avatar-row">
                <img src={property.agent.photo} alt={property.agent.name} className="agent-avatar-img" />
                <div>
                  <h4 className="agent-name">{property.agent.name}</h4>
                  <span className="agent-role">{property.agent.role}</span>
                </div>
              </div>

              <div className="agent-contact-methods">
                <a href={`tel:${property.agent.phone}`} className="agent-method-link">
                  <Phone size={15} color="var(--accent-gold)" />
                  <span>{property.agent.phone}</span>
                </a>
                <a href={`mailto:${property.agent.email}`} className="agent-method-link">
                  <Mail size={15} color="var(--accent-gold)" />
                  <span>{property.agent.email}</span>
                </a>
              </div>

              <div className="agent-cta-buttons">
                <button
                  onClick={() => openEnquiry(property, 'schedule')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Calendar size={16} />
                  <span>Schedule Private Viewing</span>
                </button>

                <button
                  onClick={() => openEnquiry(property, 'enquiry')}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <span>Confidential Inquiry</span>
                </button>
              </div>

              <div className="agent-card-disclaimer">
                <ShieldCheck size={14} color="var(--accent-gold)" />
                <span>Strict Non-Disclosure Protocol Observed</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Curated Properties */}
        <SimilarProperties
          currentPropertyId={property.id}
          category={property.category}
          city={property.location.city}
        />
      </div>
    </div>
  );
}
