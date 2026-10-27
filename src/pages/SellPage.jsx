import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { CATEGORIES, LOCATIONS, AMENITY_OPTIONS } from '../data/properties';

export default function SellPage() {
  useScrollReveal();
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [refCode, setRefCode] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Property Foundation
    address: '',
    city: 'Mumbai',
    category: 'Modernist Villa',
    architecturalStyle: 'Modernist Pavilion',
    yearBuilt: '2021',

    // Step 2: Dimensions & Features
    bedrooms: '5',
    bathrooms: '6',
    areaSqFt: '7500',
    estimatedValuation: '350000000',
    selectedAmenities: ['Private Pool', 'Biometric Security Vault'],

    // Step 3: Owner & Representation
    ownerName: '',
    email: '',
    phone: '',
    confidentialOnly: true,
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.address.trim()) errs.address = 'Street address or estate designation is required';
      if (!formData.city) errs.city = 'City is required';
    }
    if (step === 2) {
      if (!formData.areaSqFt || isNaN(formData.areaSqFt)) errs.areaSqFt = 'Valid approximate square footage required';
      if (!formData.estimatedValuation || isNaN(formData.estimatedValuation)) errs.estimatedValuation = 'Numeric valuation required';
    }
    if (step === 3) {
      if (!formData.ownerName.trim()) errs.ownerName = 'Owner or representative name required';
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid private email required';
      if (!formData.phone.trim()) errs.phone = 'Contact telephone required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const randomRef = `VV-IND-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(randomRef);
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setCurrentStep(1);
    setFormData({
      address: '',
      city: 'Mumbai',
      category: 'Modernist Villa',
      architecturalStyle: 'Modernist Pavilion',
      yearBuilt: '2021',
      bedrooms: '5',
      bathrooms: '6',
      areaSqFt: '7500',
      estimatedValuation: '350000000',
      selectedAmenities: ['Private Pool', 'Biometric Security Vault'],
      ownerName: '',
      email: '',
      phone: '',
      confidentialOnly: true,
      additionalNotes: ''
    });
  };

  return (
    <div className="sell-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <Breadcrumbs items={[{ label: 'List an Architectural Residence' }]} />

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="editorial-tag" style={{ justifyContent: 'center' }}>Private Advisory</div>
          <h1 className="section-title">Submit a Residence for Placement</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We provide confidential valuation, bespoke architectural documentation, and discrete global marketing to an accredited network of private patrons.
          </p>
        </div>

        {confirmed ? (
          <div className="demo-confirmation-card reveal-init" style={{ padding: '3.5rem 2rem' }}>
            <div className="demo-confirm-icon">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="modal-title">Dossier Registered Locally</h2>
            <p className="modal-subtitle">
              Reference Identifier:
            </p>
            <div className="demo-confirm-code">{refCode}</div>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '1.25rem auto' }}>
              Thank you, <strong>{formData.ownerName}</strong>. Your property submission for <em>{formData.address}, {formData.city}</em> has been processed in this client-side session.
            </p>

            <div className="demo-confirm-disclaimer" style={{ maxWidth: '480px', margin: '0 auto' }}>
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              <strong>Explicit Demo Notice:</strong> This is a frontend demonstration interface. No data has been transmitted to external brokers, email inboxes, or live databases.
            </div>

            <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Submit Another Property (Demo)
            </button>
          </div>
        ) : (
          <div className="sell-form-card reveal-init" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: 'clamp(1.75rem, 4vw, 3rem)' }}>
            {/* Step Progress Bar */}
            <div className="step-progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
              <div className={`step-indicator ${currentStep >= 1 ? 'is-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span className="step-num" style={{ width: '26px', height: '26px', borderRadius: '50%', background: currentStep >= 1 ? 'var(--accent-gold)' : 'var(--bg-tertiary)', color: currentStep >= 1 ? '#121513' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>
                <span style={{ color: currentStep >= 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Foundation</span>
              </div>
              <div className={`step-indicator ${currentStep >= 2 ? 'is-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span className="step-num" style={{ width: '26px', height: '26px', borderRadius: '50%', background: currentStep >= 2 ? 'var(--accent-gold)' : 'var(--bg-tertiary)', color: currentStep >= 2 ? '#121513' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
                <span style={{ color: currentStep >= 2 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Dimensions</span>
              </div>
              <div className={`step-indicator ${currentStep >= 3 ? 'is-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span className="step-num" style={{ width: '26px', height: '26px', borderRadius: '50%', background: currentStep >= 3 ? 'var(--accent-gold)' : 'var(--bg-tertiary)', color: currentStep >= 3 ? '#121513' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                <span style={{ color: currentStep >= 3 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Representation</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Property Foundation */}
              {currentStep === 1 && (
                <div>
                  <h3 className="form-step-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Step 1: Estate Identity & Locality
                  </h3>

                  <div className="form-group">
                    <label className="form-label required" htmlFor="sell-address">Estate Address or Property Designation</label>
                    <input
                      id="sell-address"
                      type="text"
                      placeholder="e.g. 14 Altamount Road or Assagao Villa Haven"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`input-field ${errors.address ? 'input-error' : ''}`}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-city">City / Region</label>
                      <select
                        id="sell-city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="select-field"
                      >
                        {LOCATIONS.filter(l => l !== 'All Locations').map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-cat">Architectural Typology</label>
                      <select
                        id="sell-cat"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="select-field"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="sell-style">Architectural Style</label>
                      <input
                        id="sell-style"
                        type="text"
                        placeholder="e.g. Indo-Portuguese, Modernist Pavilion, Art Deco..."
                        value={formData.architecturalStyle}
                        onChange={(e) => setFormData({ ...formData, architecturalStyle: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="sell-year">Year Constructed</label>
                      <input
                        id="sell-year"
                        type="number"
                        placeholder="e.g. 1928"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Dimensions & Features */}
              {currentStep === 2 && (
                <div>
                  <h3 className="form-step-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Step 2: Spatial Scale & Target Valuation
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-area">Interior Area (Sq Ft)</label>
                      <input
                        id="sell-area"
                        type="number"
                        placeholder="e.g. 8500"
                        value={formData.areaSqFt}
                        onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                        className={`input-field ${errors.areaSqFt ? 'input-error' : ''}`}
                      />
                      {errors.areaSqFt && <span className="error-message">{errors.areaSqFt}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-val">Target Valuation Expectation (₹ INR)</label>
                      <input
                        id="sell-val"
                        type="number"
                        placeholder="e.g. 350000000 (₹35 Crore)"
                        value={formData.estimatedValuation}
                        onChange={(e) => setFormData({ ...formData, estimatedValuation: e.target.value })}
                        className={`input-field ${errors.estimatedValuation ? 'input-error' : ''}`}
                      />
                      {errors.estimatedValuation && <span className="error-message">{errors.estimatedValuation}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="sell-beds">Bedroom Suites</label>
                      <input
                        id="sell-beds"
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="sell-baths">Bathrooms</label>
                      <input
                        id="sell-baths"
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prominent Amenities</label>
                    <div className="amenity-checkbox-grid">
                      {AMENITY_OPTIONS.map((amenity) => (
                        <label key={amenity} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.selectedAmenities.includes(amenity)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.selectedAmenities, amenity]
                                : formData.selectedAmenities.filter(a => a !== amenity);
                              setFormData({ ...formData, selectedAmenities: updated });
                            }}
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Representation & Owner Details */}
              {currentStep === 3 && (
                <div>
                  <h3 className="form-step-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Step 3: Ownership Representation & Discretion
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-name">Owner / Representative Full Name</label>
                      <input
                        id="sell-name"
                        type="text"
                        placeholder="e.g. Vikramaditya Singhal"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className={`input-field ${errors.ownerName ? 'input-error' : ''}`}
                      />
                      {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label required" htmlFor="sell-email">Confidential Contact Email</label>
                      <input
                        id="sell-email"
                        type="email"
                        placeholder="name@familyoffice.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`input-field ${errors.email ? 'input-error' : ''}`}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label required" htmlFor="sell-phone">Direct Phone</label>
                    <input
                      id="sell-phone"
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`input-field ${errors.phone ? 'input-error' : ''}`}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="sell-notes">Confidential Notes / Renovation Pedigree</label>
                    <textarea
                      id="sell-notes"
                      placeholder="Detail any notable architects, historical provenance, grounds acreage, or specific timeline constraints..."
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      className="textarea-field"
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.confidentialOnly}
                        onChange={(e) => setFormData({ ...formData, confidentialOnly: e.target.checked })}
                      />
                      <span>Strictly Off-Market Confidential Placement (No Public Syndication)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                {currentStep > 1 ? (
                  <button type="button" onClick={handlePrev} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {currentStep < 3 ? (
                  <button type="button" onClick={handleNext} className="btn btn-primary">
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-lg">
                    <span>Submit Residence for Placement (Demo)</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
