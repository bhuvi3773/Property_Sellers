import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, SlidersHorizontal } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import Logo from '../common/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { favouritesCount, compareCount, toggleMenu, isMenuOpen } = useRealEstate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Subtle Architectural Demo Banner */}
      <div className="demo-banner" role="status" aria-label="Demo environment notice">
        <span className="demo-banner-content">
          <strong className="demo-banner-brand">VAULT & VISTA</strong>
          <span className="demo-banner-sep">—</span>
          <span className="demo-banner-desc">Interactive Frontend Architectural Experience (Demo Mode)</span>
        </span>
      </div>

      <div className="header-main-bar">
        <div className="container-wide header-container">
          {/* Brand Identity */}
          <Link to="/" className="header-brand" aria-label="Vault & Vista Home">
            <Logo size="default" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop" aria-label="Primary navigation">
            <Link to="/buy" className={`nav-link ${location.pathname === '/buy' ? 'active' : ''}`}>
              Buy
            </Link>
            <Link to="/rent" className={`nav-link ${location.pathname === '/rent' ? 'active' : ''}`}>
              Rent
            </Link>
            <Link to="/sell" className={`nav-link ${location.pathname === '/sell' ? 'active' : ''}`}>
              List Residence
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              The Agency
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Concierge
            </Link>
          </nav>

          {/* Actions & Fullscreen Menu Trigger */}
          <div className="header-actions">
            {/* Favourites with Live Badge */}
            <Link
              to="/favourites"
              className="header-icon-btn header-fav-btn"
              title="Saved Residences"
              aria-label={`Saved residences, ${favouritesCount} items`}
            >
              <Heart
                size={18}
                fill={favouritesCount > 0 ? "var(--accent-gold)" : "none"}
                color={favouritesCount > 0 ? "var(--accent-gold)" : "currentColor"}
              />
              {favouritesCount > 0 && <span className="icon-badge">{favouritesCount}</span>}
            </Link>

            {/* Compare with Live Badge */}
            <Link
              to="/compare"
              className="header-icon-btn header-compare-btn"
              title="Comparison Matrix"
              aria-label={`Comparison matrix, ${compareCount} items`}
            >
              <SlidersHorizontal
                size={18}
                color={compareCount > 0 ? "var(--accent-gold)" : "currentColor"}
              />
              {compareCount > 0 && <span className="icon-badge">{compareCount}</span>}
            </Link>

            {/* Signature Fullscreen Menu Trigger */}
            <button
              onClick={toggleMenu}
              className="menu-trigger-btn"
              aria-label={isMenuOpen ? "Close menu" : "Open menu directory"}
              aria-expanded={isMenuOpen}
            >
              <div className="menu-trigger-bars" aria-hidden="true">
                <span></span>
                <span></span>
              </div>
              <span className="menu-trigger-text">Index</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
