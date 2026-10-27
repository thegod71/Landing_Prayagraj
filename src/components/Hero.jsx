import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/api';
import './Hero.css';

export default function Hero({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const [formData, setFormData] = useState({
    exam: 'UPSC CSE',
    stage: 'Beginner',
    fullName: '',
    mobile: '',
    city: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!formData.city.trim()) {
            setErrorMsg('Please enter your city');
            return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await submitLead({
        fullName: formData.fullName,
        mobile: formData.mobile,
        exam: formData.exam,
        stage: formData.stage,
        city: formData.city,
        source: 'Hero Roadmap Card',
        centre: `${activeCity} Centre`,
      });

      if (response.success) {
        setSubmitted(true);
        // Fire confetti explosion
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c88a22', '#0b1a30', '#10b981', '#f59e0b'],
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
    <section className="hero-section" id="hero">
      <div className="hero-overlay-ambient"></div>
      
      {/* Soft Shaded Background Artwork matching screenshot */}
      <div className="hero-artwork-shade" aria-hidden="true">
        <img
          src="/assets/hero_aspirants.jpg"
          alt="Civil services aspirants"
          className="hero-shade-img"
        />
        <div className="hero-shade-gradient-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Column Content */}
          <div className="hero-left">
            <div className="hero-exam-pill">
              <span>UPSC | UPPCS | CIVIL SERVICES</span>
            </div>

            <h1 className="hero-main-title">
              Your Civil Services <br />
              Journey <span className="hero-title-accent">Starts Here.</span>
            </h1>

            <div className="hero-subfeatures">
              <span>Expert Guidance</span>
              <span className="sep">•</span>
              <span>Structured Preparation</span>
              <span className="sep">•</span>
              <span>Personal Mentorship</span>
            </div>

            <p className="hero-description">
              At Dhyeya IAS {activeCity}, we help you prepare with clarity, discipline and the right strategy to turn your civil services dream into reality.
            </p>

            {/* 4 Stats from Reference Image */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3000+</span>
                <span className="stat-label">Selections Across Programmes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Expert</span>
                <span className="stat-label">FACULTY & MENTORS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{activeCity}</span>
                <span className="stat-label">Dedicated Centre</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Card */}
          <div className="hero-right">
            <div className="hero-card">
              <span className="hero-card-free-tag">FREE</span>

              {!submitted ? (
                <>
                  <div className="hero-card-header">
                    <h2 className="hero-card-title">
                      Get Your Personalised Preparation Roadmap
                    </h2>
                    <p className="hero-card-subtitle">
                      Fill in a few details and get a customised study plan, booklist and expert guidance.
                    </p>
                  </div>

                  <form className="hero-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Which exam are you preparing for?</label>
                      <select
                        name="exam"
                        className="form-select"
                        value={formData.exam}
                        onChange={handleChange}
                      >
                        <option value="UPSC CSE">UPSC CSE (Civil Services)</option>
                        <option value="UPPCS / UPPSC">UPPCS / UPPSC</option>
                        <option value="Both UPSC & UPPCS">Integrated UPSC + UPPCS</option>
                        <option value="State PCS">Other State PSC</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your current stage?</label>
                      <select
                        name="stage"
                        className="form-select"
                        value={formData.stage}
                        onChange={handleChange}
                      >
                        <option value="Beginner">Beginner (Starting from scratch)</option>
                        <option value="Currently Preparing">Currently Preparing (1+ years)</option>
                        <option value="Repeat Aspirant">Repeat Aspirant (Given Prelims)</option>
                        <option value="Prelims Qualified">Prelims Qualified (Mains Focus)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-input"
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-input"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Enter Your City</label>
                      <input
                        type="text"
                        name="city"
                        className="form-input"
                        placeholder="e.g. Prayagraj"
                        value={formData.city}
                        onChange={handleChange}
                        required

                        
                      />
                    </div>

                    {errorMsg && (
                      <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '2px' }}>
                        {errorMsg}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn-hero-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Generating Roadmap...</span>
                        </>
                      ) : (
                        <>
                          <span>Get My Free Roadmap</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <div className="hero-trust-footer">
                      <ShieldCheck size={14} color="#059669" />
                      <span>100% Free Guidance • No Spam • Your details are safe with us</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="hero-card-success">
                  <div className="success-check-badge">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="success-title">Roadmap Request Received!</h3>
                  <p className="success-text">
                    Thank you, <strong>{formData.fullName}</strong>. Our senior mentor for {formData.exam} at Dhyeya IAS {activeCity} is reviewing your profile. We will WhatsApp your roadmap shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-fullscreen-trigger"
                    onClick={() => onOpenLeadModal('Post Hero CTA')}
                  >
                    <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Open Detailed 1-on-1 Assessment (Full Screen)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
