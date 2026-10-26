import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, SlidersHorizontal, Bed, Bath, Maximize2, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

/**
 * HorizontalScrollShowcase
 * Award-winning pinned horizontal scroll experience:
 * - As the user scrolls DOWN, the section pins to the viewport.
 * - Properties smoothly glide in from the right across the screen.
 * - When all items have traversed, the page unpins and normal vertical scroll resumes down.
 * - When scrolling UP, items gracefully scroll back in reverse sequence.
 */
export default function HorizontalScrollShowcase({ properties = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { toggleFavourite, isFavourite, toggleCompare, isInCompare } = useRealEstate();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState(2500);

  // Measure track width and compute dynamic travel distance
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = Math.max(trackWidth - viewportWidth + 120, 1000);
        setMaxScrollDistance(distance);
      }
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, [properties]);

  // Track vertical scroll to calculate horizontal translation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollableDistance = rect.height - windowHeight;

          if (totalScrollableDistance > 0) {
            // Calculate progress between 0 and 1
            const rawProgress = -rect.top / totalScrollableDistance;
            const progress = Math.min(Math.max(rawProgress, 0), 1);
            setScrollProgress(progress);

            // Compute currently focused card index for live counter
            const count = properties.length + 1; // +1 for end card
            const currentIdx = Math.min(Math.floor(progress * count), count - 1);
            setActiveCardIndex(currentIdx);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [properties.length]);

  // Horizontal translation offset in pixels
  const horizontalTranslateX = scrollProgress * maxScrollDistance;
  const isFinished = scrollProgress >= 0.98;

  // Manual nudge buttons for convenience or accessibility
  const scrollSectionBy = (direction) => {
    if (!containerRef.current) return;
    const scrollAmount = window.innerHeight * 0.75 * direction;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="horizontal-scroll-container"
      style={{
        // Virtual scroll height: provides the vertical distance needed to translate horizontal items
        height: `calc(100vh + ${maxScrollDistance}px)`
      }}
      aria-label="Horizontal Portfolio Showcase"
    >
      {/* Sticky Viewport Stage */}
      <div className="horizontal-scroll-sticky-stage">
        {/* Top Control & Editorial Banner */}
        <div className="hscroll-top-header">
          <div className="container-wide hscroll-header-flex">
            <div>
              <div className="editorial-tag">Horizontal Showcase</div>
              <h2 className="section-title hscroll-title">
                Iconic Indian Residences
              </h2>
              <p className="section-subtitle hscroll-desc">
                Scroll down to traverse our curated portfolio as residences glide in from the right.
              </p>
            </div>

            {/* Interactive Progress Meter & Direction Prompt */}
            <div className="hscroll-progress-panel">
              <div className="hscroll-status-row">
                <span className="hscroll-counter">
                  <strong className="active-num">
                    {String(Math.min(activeCardIndex + 1, properties.length)).padStart(2, '0')}
                  </strong>
                  <span className="divider">/</span>
                  <span className="total-num">
                    {String(properties.length).padStart(2, '0')}
                  </span>
                </span>

                <div className="hscroll-hint-pill">
                  {isFinished ? (
                    <span className="hint-finished">Showcase complete • Continue scrolling ↓</span>
                  ) : (
                    <span className="hint-scroll">Scroll down to traverse →</span>
                  )}
                </div>

                {/* Quick Arrow Controls */}
                <div className="hscroll-arrows">
                  <button
                    onClick={() => scrollSectionBy(-1)}
                    className="hscroll-arrow-btn"
                    disabled={scrollProgress <= 0.02}
                    title="Previous residence"
                    aria-label="Previous residence"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollSectionBy(1)}
                    className="hscroll-arrow-btn"
                    disabled={isFinished}
                    title="Next residence"
                    aria-label="Next residence"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Gold Progress Track */}
              <div className="hscroll-track-bar">
                <div
                  className="hscroll-track-fill"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* The Horizontal Track Canvas */}
        <div className="hscroll-track-viewport">
          <div
            ref={trackRef}
            className="hscroll-cards-track"
            style={{
              transform: `translate3d(-${horizontalTranslateX}px, 0, 0)`
            }}
          >
            {properties.map((prop, idx) => {
              const favourited = isFavourite(prop.id);
              const inCompare = isInCompare(prop.id);

              return (
                <div key={prop.id} className="hscroll-card-item">
                  <article className="hshowcase-card">
                    {/* Media Container */}
                    <div className="hshowcase-media-box">
                      <Link to={`/property/${prop.slug}`} aria-label={`View ${prop.title}`}>
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="hshowcase-img"
                          loading="lazy"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="card-badges-row">
                        <span className={`badge ${prop.listingType === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
                          For {prop.listingType === 'sale' ? 'Sale' : 'Lease'}
                        </span>
                        {prop.isNew && <span className="badge badge-new">Newly Listed</span>}
                      </div>

                      {/* Action Overlays */}
                      <div className="card-actions-overlay">
                        <button
                          onClick={() => toggleFavourite(prop.id)}
                          className={`card-action-btn ${favourited ? 'is-active' : ''}`}
                          title={favourited ? 'Remove from Saved' : 'Save Residence'}
                          aria-label={favourited ? 'Saved in portfolio' : 'Save to portfolio'}
                        >
                          <Heart size={16} fill={favourited ? "var(--accent-gold)" : "none"} color={favourited ? "var(--accent-gold)" : "currentColor"} />
                        </button>
                        <button
                          onClick={() => toggleCompare(prop.id)}
                          className={`card-action-btn ${inCompare ? 'is-active' : ''}`}
                          title={inCompare ? 'In Comparison Matrix' : 'Add to Comparison Matrix'}
                          aria-label="Compare property"
                        >
                          <SlidersHorizontal size={16} color={inCompare ? "var(--accent-gold)" : "currentColor"} />
                        </button>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="hshowcase-content">
                      <div className="hshowcase-locality">
                        <MapPin size={13} color="var(--accent-gold)" />
                        <span>{prop.location.locality}, {prop.location.city}</span>
                      </div>

                      <Link to={`/property/${prop.slug}`}>
                        <h3 className="hshowcase-title">{prop.title}</h3>
                      </Link>

                      <p className="hshowcase-tagline">{prop.tagline}</p>

                      {/* Architectural Specs Ribbon */}
                      <div className="hshowcase-specs">
                        <div className="hspec">
                          <Bed size={14} color="var(--accent-brass)" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                        <div className="hspec">
                          <Bath size={14} color="var(--accent-brass)" />
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                        <div className="hspec">
                          <Maximize2 size={14} color="var(--accent-brass)" />
                          <span>{prop.areaSqFt.toLocaleString()} sq ft</span>
                        </div>
                      </div>

                      {/* Price & Explore CTA */}
                      <div className="hshowcase-footer">
                        <div className="hshowcase-price">{prop.formattedPrice}</div>
                        <Link to={`/property/${prop.slug}`} className="btn btn-secondary btn-sm">
                          <span>Inspect Dossier</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}

            {/* Ending Destination Card in Track */}
            <div className="hscroll-card-item hscroll-end-item">
              <div className="hshowcase-terminal-card">
                <div className="terminal-badge">Complete Collection</div>
                <h3 className="terminal-title">Explore All 22 Indian Residences</h3>
                <p className="terminal-desc">
                  Browse our full acquisition and tenancy index spanning Mumbai sea-facing villas, Lutyens' bungalows, Assagao estates, and lakeside pavilions in ₹ Crores.
                </p>
                <Link to="/buy" className="btn btn-primary btn-lg">
                  <span>View All Residences</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
