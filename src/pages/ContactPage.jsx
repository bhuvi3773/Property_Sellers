import React, { useState } from 'react';
import { Phone, MapPin, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { GLOBAL_SHOWROOMS } from '../data/properties';

export default function ContactPage() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredHub: 'Mumbai Private Office',
    inquiryType: 'Acquisition Advisory',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [refCode, setRefCode] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email address required';
    if (!formData.phone.trim()) errs.phone = 'Contact telephone required';
    if (!formData.message.trim()) errs.message = 'Please provide details on your inquiry';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const code = `VV-CNCG-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredHub: 'Mumbai Private Office',
      inquiryType: 'Acquisition Advisory',
      message: ''
    });
  };

  return (
    <div className="contact-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Private Concierge & Showrooms' }]} />

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="editorial-tag" style={{ justifyContent: 'center' }}>Direct Advisory</div>
          <h1 className="section-title">Private Concierge & Showrooms</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Connect with our managing partners for confidential acquisitions, off-market viewings, and discrete property valuations.
          </p>
        </div>

        {/* Global Showrooms Grid */}
        <section className="section-tight" style={{ marginBottom: '4rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="editorial-tag">Indian Presence</div>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Our Private Salons & Advisory Hubs</h2>
          </div>

          <div className="showrooms-grid reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {GLOBAL_SHOWROOMS.map((showroom, idx) => (
              <div key={idx} className="showroom-card reveal-init" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <img src={showroom.image} alt={showroom.city} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{showroom.city}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <MapPin size={14} color="var(--accent-gold)" />
                    <span>{showroom.address}</span>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <Phone size={14} color="var(--accent-gold)" />
                    <a href={`tel:${showroom.phone}`} style={{ color: 'var(--accent-gold)' }}>{showroom.phone}</a>
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} />
                    <span>{showroom.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-tight" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="editorial-tag" style={{ justifyContent: 'center' }}>Confidential Channel</div>
              <h2 className="section-title">Direct Partner Inquiry</h2>
            </div>

            {confirmed ? (
              <div className="demo-confirmation-card reveal-init" style={{ padding: '3.5rem 2rem' }}>
                <div className="demo-confirm-icon">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="modal-title">Inquiry Registered Locally</h3>
                <p className="modal-subtitle">Tracking Reference Code:</p>
                <div className="demo-confirm-code">{refCode}</div>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: '1.25rem 0' }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry directed to our <em>{formData.preferredHub}</em> has been logged in this client-side session.
                </p>

                <div className="demo-confirm-disclaimer">
                  <ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                  <strong>Demo Mode Confirmation:</strong> This is a frontend demo. No data was transmitted to external servers or real brokers.
                </div>

                <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '2rem' }}>
                  Send Another Inquiry (Demo)
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-card reveal-init" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: 'clamp(1.75rem, 4vw, 3rem)' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-name">Full Legal Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Yashvardhan Goenka"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`input-field ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-email">Confidential Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@organization.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`input-field ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-phone">Direct Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`input-field ${errors.phone ? 'input-error' : ''}`}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-hub">Preferred Private Office / Salon</label>
                    <select
                      id="contact-hub"
                      value={formData.preferredHub}
                      onChange={(e) => setFormData({ ...formData, preferredHub: e.target.value })}
                      className="select-field"
                    >
                      <option value="Mumbai Private Office">Mumbai (Nariman Point & BKC)</option>
                      <option value="New Delhi Heritage Atrium">New Delhi (Lutyens' & Connaught Place)</option>
                      <option value="Bengaluru Tech & Private Banking">Bengaluru (UB City & Sadashivanagar)</option>
                      <option value="Goa Coastal Atelier">Goa (Fontainhas & Assagao)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-type">Inquiry Classification</label>
                  <select
                    id="contact-type"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="select-field"
                  >
                    <option value="Acquisition Advisory">Private Acquisition Inquiry</option>
                    <option value="Private Lease Concierge">Private Leasehold & Tenancy</option>
                    <option value="Off-Market Placement">Off-Market Property Listing & Valuation</option>
                    <option value="Architectural Press & Curation">Architectural Press & Foundation Advisory</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label required" htmlFor="contact-message">Confidential Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Describe your architectural requirements, regions of interest, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`textarea-field ${errors.message ? 'input-error' : ''}`}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={16} color="var(--accent-gold)" />
                  <span>All communications are treated with strict confidentiality under non-disclosure protocols.</span>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <span>Submit Confidential Inquiry (Demo)</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
