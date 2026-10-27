import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import Logo from '../common/Logo';

const NAV_ITEMS = [
  {
    path: '/buy',
    index: '01',
    label: 'Residences for Sale',
    tagline: 'Sea-facing penthouses, heritage havelis & modernist estates',
    previewImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Private Acquisitions',
    previewDesc: 'Explore 22 curated prime residences across Mumbai, New Delhi, Goa, Bengaluru, and Udaipur.'
  },
  {
    path: '/rent',
    index: '02',
    label: 'Private Leases',
    tagline: 'Exclusive long-term & seasonal executive residences in ₹ Lakhs',
    previewImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Curated Tenancies',
    previewDesc: 'Fully serviced luxury residences with dedicated staff, biometric privacy, and private pools.'
  },
  {
    path: '/sell',
    index: '03',
    label: 'List a Residence',
    tagline: 'Discreet placement for India’s finest architectural properties',
    previewImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Architectural Valuation',
    previewDesc: 'Submit your estate for bespoke placement within our high-net-worth collector network.'
  },
  {
    path: '/favourites',
    index: '04',
    label: 'Saved Portfolio',
    tagline: 'Your shortlisted residences and bookmarks',
    previewImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Private Portfolio',
    previewDesc: 'Review your saved architectural selections and request synchronized private viewings.'
  },
  {
    path: '/compare',
    index: '05',
    label: 'Comparison Matrix',
    tagline: 'Side-by-side architectural & ₹ / sq ft breakdown',
    previewImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Analytical Spec Matrix',
    previewDesc: 'Compare carpet areas, architectural eras, amenities, and ₹ price metrics side by side.'
  },
  {
    path: '/about',
    index: '06',
    label: 'The Agency & Manifesto',
    tagline: 'Curation over volume. Heritage over haste.',
    previewImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Curatorial Integrity',
    previewDesc: 'Founded by architects and conservationists representing sovereign Indian real estate.'
  },
  {
    path: '/contact',
    index: '07',
    label: 'Private Concierge',
    tagline: 'Private salons & bespoke advisory across India',
    previewImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Direct Inquiries',
    previewDesc: 'Connect with senior partners across Mumbai, New Delhi, Bengaluru, and Goa.'
  }
];

export default function FullscreenNav() {
  const { isMenuOpen, closeMenu, favouritesCount, compareCount } = useRealEstate();
  const [activePreview, setActivePreview] = useState(NAV_ITEMS[0]);
  const location = useLocation();
  const closeBtnRef = useRef(null);

  // Focus close button when menu opens
  useEffect(() => {
    if (isMenuOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <div
      className={`fullscreen-nav-overlay ${isMenuOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header inside overlay */}
      <div className="fs-nav-header">
        <Link to="/" onClick={closeMenu} className="header-brand" aria-label="Vault & Vista Home">
          <Logo size="default" />
        </Link>

        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="fs-close-btn"
          aria-label="Close menu"
        >
          <X size={16} />
          <span>Close</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="fs-nav-body">
        {/* Left Column: Bold Typographic Links */}
        <nav aria-label="Index directory">
          <ul className="fs-links-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className="fs-link-item">
                <Link
                  to={item.path}
                  className="fs-link"
                  onMouseEnter={() => setActivePreview(item)}
                  onFocus={() => setActivePreview(item)}
                >
                  <span className="fs-link-index">{item.index}</span>
                  <span className="fs-link-label">
                    {item.label}
                    {item.path === '/favourites' && favouritesCount > 0 && (
                      <span className="fs-badge">{favouritesCount} saved</span>
                    )}
                    {item.path === '/compare' && compareCount > 0 && (
                      <span className="fs-badge">{compareCount} queued</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Column: Contextual Preview & Indian Showrooms */}
        <div className="fs-side-content">
          {/* Dynamic Hover Preview */}
          <div className="fs-interactive-preview">
            <div className="fs-preview-card">
              <img
                src={activePreview.previewImg}
                alt={activePreview.previewTitle}
                className="fs-preview-img"
                loading="lazy"
              />
              <div className="fs-preview-meta">
                <h4 className="fs-preview-title">{activePreview.previewTitle}</h4>
                <p className="fs-preview-desc">{activePreview.previewDesc}</p>
              </div>
            </div>
          </div>

          {/* Indian Advisory Hubs */}
          <div className="fs-offices-block">
            <h4 className="fs-offices-title">Private Advisory Salons (India)</h4>
            <div className="fs-offices-grid">
              <div className="fs-office-item">
                <h5>South Mumbai</h5>
                <p>Altamount Rd & BKC Pavilion</p>
                <a href="tel:+912269824400">+91 22 6982 4400</a>
              </div>
              <div className="fs-office-item">
                <h5>Lutyens' Delhi</h5>
                <p>Jor Bagh Heritage Gallery</p>
                <a href="tel:+911149827700">+91 11 4982 7700</a>
              </div>
              <div className="fs-office-item">
                <h5>Bengaluru</h5>
                <p>Sadashivanagar Private Suite</p>
                <a href="tel:+918041829900">+91 80 4182 9900</a>
              </div>
              <div className="fs-office-item">
                <h5>North Goa</h5>
                <p>Assagao Coastal Salon</p>
                <a href="tel:+918322983300">+91 832 298 3300</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


