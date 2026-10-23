import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/api';
import './AutoPopupModal.css';

export default function AutoPopupModal({ activeCity = 'Prayagraj', isOpen, onClose }) {
  // Controlled or uncontrolled state: opens automatically on page load
  const [internalVisible, setInternalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    exam: 'UPSC CSE',
    centre: `${activeCity} Centre`,
    targetYear: '2025',
  });

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Automatically open popup when anybody opens the website (production ready)
  useEffect(() => {
    // Smooth 400ms entrance delay
    const timer = setTimeout(() => {
      setInternalVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Sync external isOpen prop if provided
  const isVisible = isOpen !== undefined ? isOpen : internalVisible;

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setInternalVisible(false);
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitLead({
        ...formData,
        source: 'Auto Opening Pop-up Form',
        city: activeCity,
      });

      if (res.success) {
        setSubmittedLead(res.lead);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#c88a22', '#0b1a30', '#10b981', '#f59e0b'],
        });
      } else {
        setErrorMsg('Please check your inputs and try again.');
      }
    } catch {
      setErrorMsg('Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="autopopup-overlay" onClick={handleDismiss} role="dialog" aria-modal="true">
      <div className="autopopup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="btn-close-popup"
          onClick={handleDismiss}
          aria-label="Close Pop-up"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="autopopup-top-header">
          <div className="autopopup-badge">
            <Sparkles size={13} />
            <span>SPECIAL ADMISSION OFFER 2025-26</span>
          </div>

          <h3 className="autopopup-title">
            Book 1-on-1 Mentorship &amp; <br />
            Get <span className="autopopup-title-gold">Up to 50% Scholarship</span>
          </h3>

          <p className="autopopup-subtitle">
            Limited seats available for upcoming UPSC &amp; UPPCS Foundation Batches at {activeCity} Centre.
          </p>
        </div>

        {/* Body */}
        <div className="autopopup-body">
          {!submittedLead ? (
            <form className="autopopup-form" onSubmit={handleSubmit}>
              <div className="popup-input-group">
                <label className="popup-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  className="popup-input"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="popup-input-group">
                <label className="popup-label">10-Digit Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  className="popup-input"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
              </div>

              <div className="popup-form-row">
                <div className="popup-input-group">
                  <label className="popup-label">Target Exam</label>
                  <select
                    name="exam"
                    className="popup-select"
                    value={formData.exam}
                    onChange={handleChange}
                  >
                    <option value="UPSC CSE">UPSC CSE</option>
                    <option value="UPPCS">UPPCS</option>
                    <option value="Both UPSC & UPPCS">Both UPSC &amp; UPPCS</option>
                  </select>
                </div>

                <div className="popup-input-group">
                  <label className="popup-label">Preferred Centre</label>
                  <select
                    name="centre"
                    className="popup-select"
                    value={formData.centre}
                    onChange={handleChange}
                  >
                    <option value={`${activeCity} Centre`}>{activeCity} Centre</option>
                    <option value="Prayagraj Centre">Prayagraj Centre</option>
                    <option value="Lucknow Centre">Lucknow Centre</option>
                  </select>
                </div>
              </div>

              {errorMsg && (
                <p style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn-popup-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Reserving Seat...</span>
                  </>
                ) : (
                  <>
                    <span>Claim Free Consultation &amp; Seat</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="popup-trust-row">
                <ShieldCheck size={14} color="#059669" />
                <span>100% Free Guidance • No Spam • Your details are safe</span>
              </div>
            </form>
          ) : (
            <div className="popup-success-box">
              <div className="popup-success-icon">
                <CheckCircle size={32} />
              </div>
              <h4 className="popup-success-title">Seat Reserved Successfully!</h4>
              <p className="popup-success-desc">
                Thank you, <strong>{formData.fullName}</strong>. Our senior counselor from {formData.centre} will contact you shortly to confirm your scholarship appointment.
              </p>
              <div className="popup-token-tag">
                Pass Token: {submittedLead.id}
              </div>
              <button
                type="button"
                className="btn-popup-dismiss"
                onClick={handleDismiss}
              >
                Explore Landing Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
