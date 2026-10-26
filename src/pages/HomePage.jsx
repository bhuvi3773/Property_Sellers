import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Award, Sparkles, Building2, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDirectionalScroll } from '../hooks/useDirectionalScroll';
import { useRealEstate } from '../context/RealEstateContext';
import { CATEGORIES } from '../data/properties';
import QuickFilterBar from '../components/property/QuickFilterBar';
import PropertyCard from '../components/property/PropertyCard';
import HorizontalScrollShowcase from '../components/home/HorizontalScrollShowcase';

export default function HomePage() {
  const { allProperties } = useRealEstate();
  useScrollReveal();
  useDirectionalScroll();

  const featuredProperties = allProperties.filter(p => p.featured).slice(0, 6);
  const newProperties = allProperties.filter(p => p.isNew).slice(0, 3);

  return (
    <div className="home-page">
      {/* =======================================================
          HERO SECTION — CRYSTAL-CLEAR ARCHITECTURAL FIRST IMPRESSION
          ======================================================= */}
      <section className="hero-section">
        {/* Crisp Architectural Background Media with Ambient Scrim */}
        <div className="hero-bg-media">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=95"
            alt="Vault & Vista Sovereign Indian Architectural Residence"
            className="hero-img-backdrop"
          />
          <div className="hero-gradient-overlay" />
        </div>

        <div className="container hero-content-container">
          <div className="hero-editorial-badge reveal-init">
            <span className="hero-badge-dot" />
            <span>Curators of India's Sovereign Architectural Residences</span>
          </div>

          <h1 className="hero-headline reveal-init">
            The Architecture <br />
            <em>of Sovereign Living.</em>
          </h1>

          <p className="hero-subheadline reveal-init">
            Private estates, sea-facing penthouses, and heritage havelis across Mumbai, New Delhi, Goa, Bengaluru, and Udaipur.
          </p>

          {/* Quick Buy/Rent Filter Bar */}
          <div style={{ marginTop: '2rem' }}>
            <QuickFilterBar />
          </div>

          {/* Key Metric Highlights Band in Indian Rupees */}
          <div className="hero-metrics-band reveal-init">
            <div className="metric-item">
              <span className="metric-number">₹4,200 Cr+</span>
              <span className="metric-label">Private Portfolio Volume</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">12</span>
              <span className="metric-label">Indian Metros & Retreats</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">99.6%</span>
              <span className="metric-label">Discreet Placement Rate</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">RERA & Title Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          PINNED HORIZONTAL SCROLL SHOWCASE FOR LISTED PROPERTIES
          - Section pins to viewport as user scrolls vertically
          - Listed properties glide in from the right across the screen
          - Once finished, vertical scrolling resumes down smoothly
          ======================================================= */}
      <HorizontalScrollShowcase properties={featuredProperties} />

      {/* =======================================================
          ARCHITECTURAL CATEGORIES WITH DIRECTIONAL SCROLL
          ======================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="editorial-tag" style={{ justifyContent: 'center' }}>Typological Portfolios</div>
            <h2 className="section-title">Explore by Architectural Paradigm</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From Indo-Portuguese courtyards to modernist sea-facing cantilevers, discover homes defined by structural genius.
            </p>
          </div>

          <div className="category-cards-grid reveal-stagger">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/buy?category=${encodeURIComponent(cat.id)}`}
                className={`category-card reveal-init ${idx % 2 === 0 ? 'scroll-shift-left' : 'scroll-shift-right'}`}
              >
                <div className="cat-img-box">
                  <img src={cat.image} alt={cat.name} className="cat-img" loading="lazy" />
                  <div className="cat-overlay" />
                </div>
                <div className="cat-content">
                  <span className="cat-count">{cat.count} Indian Residences</span>
                  <h3 className="cat-title">{cat.name}</h3>
                  <span className="cat-link-cta">
                    <span>Inspect Portfolio</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          EDITORIAL ARCHITECTURAL MANIFESTO ("Form Follows Light")
          ======================================================= */}
      <section className="section">
        <div className="container">
          <div className="editorial-spread-grid">
            {/* Visual Column with Staggered Media */}
            <div className="editorial-media-column reveal-init scroll-shift-left">
              <div className="editorial-large-img-box">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="Assagao Courtyard & Basalt Stone Villa, Goa"
                  className="editorial-img"
                  loading="lazy"
                />
                <div className="editorial-caption">
                  <span>Fig. 01 — Assagao Courtyard & Basalt Stone Villa, Goa</span>
                </div>
              </div>
              <div className="editorial-floating-badge">
                <Compass size={20} color="var(--accent-gold)" />
                <div>
                  <strong>Curatorial Rigor</strong>
                  <p>Only 1 in 24 reviewed estates passes our acquisition panel.</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="editorial-text-column reveal-init scroll-shift-right">
              <div className="editorial-tag">The Vault & Vista Philosophy</div>
              <h2 className="section-title">
                We Do Not Sell Square Footage. <br />
                <em>We Curate Spatial Art.</em>
              </h2>
              <div className="editorial-paragraphs">
                <p>
                  Most luxury brokerages operate on volume and transaction velocity. Vault & Vista was established with a contrasting conviction: exceptional Indian residential architecture requires the exact curatorial scholarship applied to fine art.
                </p>
                <p>
                  Our advisory partners evaluate each property through daylight studies, basalt and teak provenance, acoustic tranquility, and Vastu-aligned spatial harmony. Whether representing a restored 19th-century Chettinad courtyard mansion or a sea-facing Worli triplex penthouse, we match residences with custodians who revere their craft.
                </p>
              </div>

              <div className="editorial-features-list">
                <div className="feature-item">
                  <Shield size={20} color="var(--accent-gold)" />
                  <div>
                    <h4>Off-Market Discretion</h4>
                    <p>Over 45% of our Indian acquisitions occur privately under confidential non-disclosure protocols.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Building2 size={20} color="var(--accent-gold)" />
                  <div>
                    <h4>Architectural Provenance</h4>
                    <p>Complete archival documentation of original structural drawings, heritage approvals, and RERA certifications.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Award size={20} color="var(--accent-gold)" />
                  <div>
                    <h4>Private Advisory Salons</h4>
                    <p>Direct senior partner representation throughout South Mumbai, Lutyens' Delhi, Bengaluru, and Goa.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/about" className="btn btn-primary">
                  <span>Discover Our Curation Manifesto</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          NEWLY LISTED ACQUISITIONS WITH DIRECTIONAL SCROLL
          ======================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="editorial-tag">Fresh Entrants</div>
              <h2 className="section-title">Newly Listed Residences</h2>
              <p className="section-subtitle">
                Recently released to the market following rigorous architectural verification.
              </p>
            </div>
            <Link to="/buy?isNew=true" className="btn btn-secondary" style={{ alignSelf: 'flex-end' }}>
              <span>View All New Additions</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="properties-grid reveal-stagger" style={{ marginTop: '3rem' }}>
            {newProperties.map((property, idx) => (
              <div
                key={property.id}
                className={idx % 2 === 0 ? 'scroll-shift-left' : 'scroll-shift-right'}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          COLLECTOR PERSPECTIVES & TESTIMONIALS (INDIAN PATRONS)
          ======================================================= */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="editorial-tag" style={{ justifyContent: 'center' }}>Testimonials</div>
            <h2 className="section-title">Collector Perspectives</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Reflections from architects, art patrons, and industrial families who have acquired generational residences through our offices.
            </p>
          </div>

          <div className="testimonials-grid reveal-stagger">
            <div className="testimonial-card reveal-init scroll-shift-left">
              <p className="testimonial-quote">
                "Vault & Vista approached the acquisition of our Malabar Hill residence with the scholarly depth of conservation architects. Their appreciation for historical basalt masonry and Arabian Sea wind-channels saved months of deliberation."
              </p>
              <div className="testimonial-author">
                <strong>Rajiv Singhania</strong>
                <span>Industrialist & Art Patron • Mumbai</span>
              </div>
            </div>

            <div className="testimonial-card reveal-init scroll-directional-card">
              <p className="testimonial-quote">
                "In Lutyens' Delhi, finding an authentic mid-century bungalow with uncompromised tree canopy and private grounds was impossible until Vault & Vista introduced us to Golf Links. Impeccable discretion."
              </p>
              <div className="testimonial-author">
                <strong>Arundhati Mehra</strong>
                <span>Heritage Foundation Trustee • New Delhi</span>
              </div>
            </div>

            <div className="testimonial-card reveal-init scroll-shift-right">
              <p className="testimonial-quote">
                "Their understanding of Goa coastal zoning, CRZ permissions, and heritage Indo-Portuguese restoration is peerless. A bespoke private family-office experience translated into coastal architecture."
              </p>
              <div className="testimonial-author">
                <strong>Karan V. Reddy</strong>
                <span>Technology Founder & Collector • Bengaluru & Assagao</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          DISCREET PLACEMENT CTA BANNER
          ======================================================= */}
      <section className="section-tight" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="cta-banner-card reveal-init">
            <div className="cta-banner-content">
              <div className="editorial-tag">Private Placements</div>
              <h2 className="cta-banner-title">
                Contemplating the Sale of a Sovereign Indian Architectural Residence?
              </h2>
              <p className="cta-banner-desc">
                We represent exceptional residential architecture to a vetted network of Indian business leaders, family offices, and diaspora collectors with absolute discretion.
              </p>
              <div className="cta-banner-buttons">
                <Link to="/sell" className="btn btn-primary btn-lg">
                  <span>Request Private ₹ Valuation</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  <span>Speak with Senior Partner</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
