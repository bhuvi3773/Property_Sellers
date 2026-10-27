import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import Logo from '../common/Logo';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useRealEstate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid private email address.', 'warn');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to the Vault & Vista Private Architectural Gazette (Demo).', 'success');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Editorial Row */}
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <Link to="/" className="header-brand" aria-label="Vault & Vista Home">
              <Logo size="large" />
            </Link>
            <p className="footer-motto">
              "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
            </p>
            <div className="footer-meta-pill">
              <ShieldCheck size={14} color="var(--accent-gold)" />
              <span>Private Client Advisory • RERA & Title Verified Architectural Residences</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="footer-newsletter-column">
            <h4 className="footer-heading">The Architectural Gazette</h4>
            <p className="footer-newsletter-desc">
              Receive discrete seasonal monographs on off-market Indian acquisitions, heritage restorations, and prime architectural intelligence.
            </p>
            {subscribed ? (
              <div className="newsletter-success-box">
                <p>✓ Subscribed. You will receive private monographs in your inbox (Demo).</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-form">
                <input
                  type="email"
                  placeholder="Enter your private email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-input"
                  required
                />
                <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <h5 className="footer-col-title">Architectural Categories</h5>
            <ul>
              <li><Link to="/buy?category=Modernist+Villa">Modernist Villas</Link></li>
              <li><Link to="/buy?category=Sea-Facing+Penthouse">Sea-Facing Penthouses</Link></li>
              <li><Link to="/buy?category=Heritage+Haveli">Heritage Havelis & Estates</Link></li>
              <li><Link to="/buy?category=Waterfront+Sanctuary">Waterfront Sanctuaries</Link></li>
              <li><Link to="/buy?category=Hillside+Retreat">Hillside Retreats</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h5 className="footer-col-title">Prime Indian Hubs</h5>
            <ul>
              <li><Link to="/buy?location=Mumbai">Mumbai (Malabar Hill, Worli, Pali Hill)</Link></li>
              <li><Link to="/buy?location=New+Delhi">New Delhi (Lutyens' & Golf Links)</Link></li>
              <li><Link to="/buy?location=Goa">Goa (Assagao, Anjuna, Moira)</Link></li>
              <li><Link to="/buy?location=Bengaluru">Bengaluru (Sadashivanagar & Indiranagar)</Link></li>
              <li><Link to="/buy?location=Udaipur">Udaipur (Lake Pichola & Aravallis)</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h5 className="footer-col-title">Advisory & Curation</h5>
            <ul>
              <li><Link to="/about">The Agency Story</Link></li>
              <li><Link to="/sell">Submit Residence for Placement</Link></li>
              <li><Link to="/compare">Residence Comparison Matrix</Link></li>
              <li><Link to="/favourites">Your Saved Portfolio</Link></li>
              <li><Link to="/contact">Private Concierge & Salons</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h5 className="footer-col-title">Private Salons (India)</h5>
            <p className="office-address">Altamount Road & BKC, Mumbai</p>
            <p className="office-address">Jor Bagh & LBZ, New Delhi</p>
            <p className="office-address">Sadashivanagar, Bengaluru</p>
            <p className="office-address">Assagao Heritage Salon, Goa</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {CURRENT_YEAR} Vault & Vista Real Estate. Curators of Exceptional Residential Architecture.</p>
          <div className="footer-bottom-links">
            <span className="demo-tag">Frontend Demonstration Project</span>
            <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to Top">
              <span>Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
