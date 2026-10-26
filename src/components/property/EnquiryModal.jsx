import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export default function EnquiryModal() {
  const { enquiryModal, closeEnquiry } = useRealEstate();
  const { isOpen, property, type } = enquiryModal;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    timeSlot: 'Morning (10:00 - 12:30)',
    ndaSigned: true,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (type === 'schedule' && !formData.preferredDate) errs.preferredDate = 'Please select a preferred viewing date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const randomCode = `VV-${type.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredDate: '',
      timeSlot: 'Morning (10:00 - 12:30)',
      ndaSigned: true,
      message: ''
    });
    closeEnquiry();
  };

  return (
    <div className="modal-overlay" onClick={handleReset}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleReset} className="modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        {confirmed ? (
          <div className="demo-confirmation-card">
            <div className="demo-confirm-icon">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="modal-title">
              {type === 'schedule' ? 'Private Viewing Requested' : 'Confidential Enquiry Logged'}
            </h3>
            <p className="modal-subtitle">
              Residence: <strong>{property ? property.title : 'Architectural Portfolio'}</strong>
            </p>
            <div className="demo-confirm-code">{confirmationCode}</div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your request has been recorded in this client-side session.
            </p>

            <div className="demo-confirm-disclaimer">
              <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              <strong>Notice:</strong> This is a frontend demonstration project. No customer information has been transmitted to external databases, CRMs, or live brokers.
            </div>

            <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
              Return to Residence
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="editorial-tag">
                {type === 'schedule' ? 'Private Viewing Concierge' : 'Discrete Client Inquiry'}
              </div>
              <h3 className="modal-title">
                {type === 'schedule' ? 'Schedule a Private Walkthrough' : 'Inquire on this Residence'}
              </h3>
              {property && (
                <p className="modal-subtitle">
                  {property.title} • {property.location.locality}, {property.location.city} ({property.formattedPrice})
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required" htmlFor="modal-name">Full Legal Name</label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="e.g. Yashvardhan Goenka"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`input-field ${errors.fullName ? 'input-error' : ''}`}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required" htmlFor="modal-email">Private Email</label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required" htmlFor="modal-phone">Direct Contact Telephone</label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              {type === 'schedule' && (
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required" htmlFor="modal-date">Preferred Viewing Date</label>
                    <input
                      id="modal-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`input-field ${errors.preferredDate ? 'input-error' : ''}`}
                    />
                    {errors.preferredDate && <span className="error-message">{errors.preferredDate}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="modal-time">Time Window</label>
                    <select
                      id="modal-time"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="select-field"
                    >
                      <option value="Morning (10:00 - 12:30)">Morning (10:00 - 12:30)</option>
                      <option value="Afternoon (14:00 - 16:30)">Afternoon (14:00 - 16:30)</option>
                      <option value="Twilight Viewing (17:30 - 19:00)">Twilight Viewing (17:30 - 19:00)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="modal-msg">Confidential Notes / Acquisition Inquiries</label>
                <textarea
                  id="modal-msg"
                  placeholder="Mention any specific architectural interests, private security requirements, or scheduling preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="textarea-field"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.ndaSigned}
                    onChange={(e) => setFormData({ ...formData, ndaSigned: e.target.checked })}
                  />
                  <span>Request standard Confidentiality & Discrete Advisory Protocol</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                {type === 'schedule' ? 'Request Private Viewing (Demo)' : 'Submit Confidential Inquiry (Demo)'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
