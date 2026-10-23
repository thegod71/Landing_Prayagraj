import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/api';
import './FullscreenLeadModal.css';

export default function FullscreenLeadModal({ isOpen, onClose, triggerSource = 'Direct Click', activeCity = 'Prayagraj' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: activeCity,
    exam: 'UPSC CSE',
    targetYear: '2025',
    medium: 'English Medium',
    stage: 'Beginner',
    challenge: 'Answer Writing & Mentorship',
    optionalSubject: 'General Studies / Undecided',
    centre: `${activeCity} Classroom`,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSelectChip = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
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

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await submitLead({
        ...formData,
        source: `Fullscreen Modal (${triggerSource})`,
      });

      if (response.success) {
        setSubmittedLead(response.lead || { id: 'DHYEYA-' + Date.now().toString().slice(-6) });
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#c88a22', '#38bdf8', '#10b981', '#fbbf24', '#ffffff'],
        });
      } else {
        setErrorMsg(response.message || 'Please check your information and try again.');
      }
    } catch {
      setErrorMsg('Please check your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fullscreen-modal-overlay" role="dialog" aria-modal="true">
      {/* Top Header */}
      <div className="modal-header-bar">
        <div className="modal-brand">
          <span style={{ fontSize: '1.2rem' }}>☀️</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.05em' }}>
            DHYEYA IAS
          </span>
          <span className="modal-brand-badge">{activeCity.toUpperCase()} CENTRE</span>
        </div>

        <div className="modal-steps-indicator">
          <div className="modal-step-dot completed">
            <span className="dot-num">✓</span>
            <span>Aspirant Profile</span>
          </div>
          <div className="modal-step-dot active">
            <span className="dot-num">2</span>
            <span>Personalised Roadmap</span>
          </div>
          <div className="modal-step-dot">
            <span className="dot-num">3</span>
            <span>Expert Allocation</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-close-modal"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="modal-body-container">
        {!submittedLead ? (
          <>
            {/* Left Column: Form */}
            <div className="modal-form-card">
              <div className="modal-form-header">
                <span style={{ color: '#f6ad55', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  1-on-1 Senior Faculty Consultation
                </span>
                <h2 className="modal-form-title">
                  Civil Services Diagnostic &amp; Roadmap
                </h2>
                <p className="modal-form-desc">
                  Provide your target details to receive a personalized syllabus planner, answer writing diagnostic, and booklist recommendations.
                </p>
              </div>

              <form className="fullscreen-form" onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div>
                    <label className="field-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className="input-dark"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">10-Digit WhatsApp / Mobile *</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="input-dark"
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div>
                    <label className="field-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      className="input-dark"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="field-label">Your Current City</label>
                    <input
                      type="text"
                      name="city"
                      className="input-dark"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Target Examination</label>
                  <div className="chips-group">
                    {['UPSC CSE', 'UPPCS', 'Both UPSC & UPPCS', 'State PSC'].map((ex) => (
                      <button
                        type="button"
                        key={ex}
                        className={`chip-btn ${formData.exam === ex ? 'selected' : ''}`}
                        onClick={() => handleSelectChip('exam', ex)}
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div>
                    <label className="field-label">Target Attempt Year</label>
                    <select
                      name="targetYear"
                      className="input-dark"
                      value={formData.targetYear}
                      onChange={handleChange}
                    >
                      <option value="2025">2025 (Next Attempt)</option>
                      <option value="2026">2026 (1-Year Prep)</option>
                      <option value="2027">2027 (Undergraduate 2-Year)</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Medium of Instruction</label>
                    <select
                      name="medium"
                      className="input-dark"
                      value={formData.medium}
                      onChange={handleChange}
                    >
                      <option value="English Medium">English Medium</option>
                      <option value="Hindi Medium">Hindi Medium (हिन्दी माध्यम)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label">Biggest Preparation Challenge</label>
                  <div className="chips-group">
                    {[
                      'Answer Writing & Mentorship',
                      'CSAT Mastery',
                      'Current Affairs & Notes',
                      'Optional Subject Strategy',
                      'Time Management / Working Professional',
                    ].map((ch) => (
                      <button
                        type="button"
                        key={ch}
                        className={`chip-btn ${formData.challenge === ch ? 'selected' : ''}`}
                        onClick={() => handleSelectChip('challenge', ch)}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div>
                    <label className="field-label">Preferred Mode / Centre</label>
                    <select
                      name="centre"
                      className="input-dark"
                      value={formData.centre}
                      onChange={handleChange}
                    >
                      <option value="Prayagraj Classroom">Prayagraj Classroom (Civil Lines)</option>
                      <option value="Lucknow Classroom">Lucknow Classroom (Hazratganj/Alambagh)</option>
                      <option value="Online Live Hybrid">Online Live Interactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Optional Subject (If decided)</label>
                    <input
                      type="text"
                      name="optionalSubject"
                      className="input-dark"
                      placeholder="e.g. PSIR, History, Geography, Hindi Lit"
                      value={formData.optionalSubject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-submit-fullscreen"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting to Academic Board...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate &amp; Lock My Personalised Roadmap</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Confidential • Direct Allocation to Dhyeya Senior Faculty • No Spam</span>
                </div>
              </form>
            </div>

            {/* Right Column: Live Dynamic Preview */}
            <div className="live-preview-card">
              <div className="preview-badge-top">
                <Sparkles size={13} />
                <span>LIVE PREVIEW: CUSTOMIZED ROADMAP</span>
              </div>

              <h3 className="preview-candidate-name">
                {formData.fullName.trim() ? formData.fullName : 'Aspirant Roadmap'}
              </h3>
              <p className="preview-candidate-meta">
                {formData.exam} ({formData.targetYear}) • {formData.medium} • {formData.centre}
              </p>

              <div className="roadmap-timeline-box">
                <div className="roadmap-phase-row">
                  <div className="phase-dot"></div>
                  <div className="phase-content">
                    <h5>Phase 1: GS Conceptual Foundation</h5>
                    <p>NCERT &amp; Standard Books mastery + Daily static mcqs.</p>
                  </div>
                </div>

                <div className="roadmap-phase-row">
                  <div className="phase-dot"></div>
                  <div className="phase-content">
                    <h5>Phase 2: Answer Writing &amp; Optional</h5>
                    <p>Focused resolution for: <em>{formData.challenge}</em></p>
                  </div>
                </div>

                <div className="roadmap-phase-row">
                  <div className="phase-dot"></div>
                  <div className="phase-content">
                    <h5>Phase 3: Test Series &amp; All-India Simulation</h5>
                    <p>24 Full-length GS Mock tests + Detailed 1-on-1 mentor copy evaluations.</p>
                  </div>
                </div>
              </div>

              <div className="preview-mentor-box">
                <img
                  src="/assets/topper_aman.jpg"
                  alt="Senior Mentor"
                  className="mentor-avatar-mini"
                />
                <div className="mentor-info-col">
                  <h6>Assigned Academic Mentor: Senior Faculty Desk</h6>
                  <p>Dhyeya IAS {activeCity} Academic Wing</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="modal-success-screen">
            <div className="modal-success-icon">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="modal-success-title">Roadmap Generated Successfully!</h2>
            <p className="modal-success-desc">
              Your preparation profile has been recorded. A senior counsellor from Dhyeya IAS {activeCity} Centre has been assigned to your personalized roadmap.
            </p>

            <div className="lead-id-pill">
              Registration Token: <strong>{submittedLead.id}</strong>
            </div>

            <div className="modal-success-actions">
              <a
                href={`https://wa.me/919876543210?text=Hello%20Dhyeya%20IAS,%20my%20name%20is%20${encodeURIComponent(formData.fullName)}%20and%20my%20Roadmap%20Token%20is%20${submittedLead.id}.%20I%20am%20preparing%20for%20${encodeURIComponent(formData.exam)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-connect"
              >
                <MessageSquare size={16} />
                <span>Chat With Senior Counsellor on WhatsApp</span>
              </a>

              <button
                type="button"
                className="btn-modal-close-final"
                onClick={onClose}
              >
                Close Fullscreen Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
