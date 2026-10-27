import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-page" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '8rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div className="editorial-tag" style={{ justifyContent: 'center' }}>Error 404</div>
        
        <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1, marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>
          Spatial Void
        </h1>

        <p className="section-subtitle" style={{ margin: '0 auto 2.5rem' }}>
          The architectural route you are attempting to traverse does not exist or has been withdrawn from our private archives.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <span>Return to Sanctuary (Home)</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/buy" className="btn btn-secondary">
            <span>Browse Acquisition Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
