import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function AboutPage() {
  useScrollReveal();

  const PARTNERS = [
    {
      name: "Vikramaditya Singhania",
      role: "Co-Founder & Senior Partner, Prime Mumbai & Western India",
      credentials: "Alum CEPT Ahmedabad • Former Advisor, Urban Heritage Conservation",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "With three decades advising on heritage basalt mansions and Arabian Sea frontages across Malabar Hill and Pali Hill, Vikramaditya established Vault & Vista's architectural verification protocol."
    },
    {
      name: "Gayatri Devi Rathore",
      role: "Managing Director, Heritage & Northern India",
      credentials: "M.Arch, Architectural Conservation • Intach Advisor",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      bio: "A renowned heritage preservationist, Gayatri has guided over ₹3,200 Cr in iconic residential transfers across Lutyens' Bungalow Zone, Golf Links, and Udaipur palace estates."
    },
    {
      name: "Ananya Roy",
      role: "Partner, South India & Coastal Sanctuaries",
      credentials: "B.Arch, SPA Delhi • Specialist in Tropical Modernism",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      bio: "Specializing in Indo-Portuguese estates in Goa and modernist cantilever villas in Sadashivanagar and Alibaug, Ananya coordinates private off-market transfers for diaspora patrons."
    },
    {
      name: "Devendra K. Oberoi",
      role: "Partner, Family Office & Capital Advisory",
      credentials: "Private Wealth Counsel • Fellow, Indian Trust for Art & Cultural Heritage",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      bio: "Advising premier Indian family offices and industrial leaders on sovereign real estate holdings, title due diligence, and off-market residential acquisitions."
    }
  ];

  return (
    <div className="about-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'The Agency & Manifesto' }]} />

        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="editorial-tag" style={{ justifyContent: 'center' }}>Heritage & Curation</div>
          <h1 className="section-title">The Curators of Spatial Art</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Vault & Vista was founded on a singular premise: exceptional architecture is not a commodity, but a rare cultural patrimony requiring scholarship, restraint, and absolute discretion.
          </p>
        </div>

        {/* Architectural Manifesto Spread */}
        <div className="editorial-spread-grid" style={{ marginBottom: '6rem' }}>
          <div className="editorial-large-img-box reveal-init">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
              alt="Vault & Vista Editorial Architecture"
              className="editorial-img"
              style={{ height: '480px' }}
            />
          </div>

          <div className="editorial-text-column reveal-init">
            <div className="editorial-tag">Our Founding Ethos</div>
            <h2 className="section-title" style={{ fontSize: '2.4rem' }}>
              Built Upon Three Tenets of Architectural Integrity
            </h2>
            <div className="editorial-paragraphs">
              <p>
                In an era dominated by automated property aggregators and speculative volume, Vault & Vista maintains an unyielding curatorial filter. We operate as an independent private partnership, maintaining direct relationships with architectural historians, conservation master-craftsmen, and private estates.
              </p>
              <p>
                Every candidate estate undergoes multi-point forensic review before placement: verifying structural authenticity, daylight trajectories, acoustic tranquility, and historical provenance.
              </p>
            </div>

            <div className="editorial-features-list">
              <div className="feature-item">
                <Compass size={20} color="var(--accent-gold)" />
                <div>
                  <h4>1. Structural Scholarship</h4>
                  <p>Archival documentation of master architects, original blueprints, and tectonic provenance.</p>
                </div>
              </div>
              <div className="feature-item">
                <ShieldCheck size={20} color="var(--accent-gold)" />
                <div>
                  <h4>2. Generational Discretion</h4>
                  <p>Strict non-disclosure protocols protecting our clients' privacy and financial confidentiality.</p>
                </div>
              </div>
              <div className="feature-item">
                <BookOpen size={20} color="var(--accent-gold)" />
                <div>
                  <h4>3. Spatial Curation</h4>
                  <p>We represent only 20 to 25 sovereign properties across India at any moment, guaranteeing total partner commitment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Senior Partners Directory */}
        <section className="section-tight" style={{ borderTop: '1px solid var(--border-subtle)', marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="editorial-tag" style={{ justifyContent: 'center' }}>Partnership</div>
            <h2 className="section-title">Senior Partners & Advisory Board</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Our partners bring architectural scholarship, international property law expertise, and generational market acumen.
            </p>
          </div>

          <div className="partners-grid reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="partner-card reveal-init" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <img src={partner.photo} alt={partner.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{partner.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{partner.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{partner.credentials}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{partner.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Concierge CTA */}
        <div className="cta-banner-card reveal-init">
          <div className="cta-banner-content">
            <div className="editorial-tag">Schedule an Introduction</div>
            <h2 className="cta-banner-title">Consult with Our Private Office</h2>
            <p className="cta-banner-desc">
              Whether seeking a generational acquisition or contemplating the placement of an architectural landmark, our senior partners are available for confidential consultations.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <span>Connect with Private Concierge</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
