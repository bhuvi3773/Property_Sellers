import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import Logo from '../common/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { favouritesCount, compareCount, toggleMenu } = useRealEstate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container-wide header-container">
          {/* Brand Identity */}
          <Link to="/" className="header-brand" aria-label="Vault and Vista Architectural Residences">
            <Logo size="default" />
          </Link>

          {/* Desktop Quick Nav */}
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

          {/* Actions & Signature Menu Trigger */}
          <div className="header-actions">
            {/* Favourites with Live Badge */}
            <Link to="/favourites" className="header-icon-btn" title="Saved Residences" aria-label={`Saved residences, ${favouritesCount} items`}>
              <Heart size={18} fill={favouritesCount > 0 ? "var(--accent-gold)" : "none"} color={favouritesCount > 0 ? "var(--accent-gold)" : "currentColor"} />
              {favouritesCount > 0 && <span className="icon-badge">{favouritesCount}</span>}
            </Link>

            {/* Compare with Live Badge */}
            <Link to="/compare" className="header-icon-btn" title="Comparison Matrix" aria-label={`Comparison matrix, ${compareCount} items`}>
              <SlidersHorizontal size={18} color={compareCount > 0 ? "var(--accent-gold)" : "currentColor"} />
              {compareCount > 0 && <span className="icon-badge">{compareCount}</span>}
            </Link>

            {/* Thonik-inspired Fullscreen Menu Trigger */}
            <button
              onClick={toggleMenu}
              className="menu-trigger-btn"
              aria-label="Toggle Fullscreen Menu"
              aria-expanded="false"
            >
              <div className="menu-trigger-bars" aria-hidden="true">
                <span></span>
                <span></span>
              </div>
              <span className="menu-trigger-text">Index</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
