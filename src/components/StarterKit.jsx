import React, { useState } from 'react';
import { FileCheck, BookOpen, Calendar, Target, Download, CheckCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/api';
import './StarterKit.css';

export default function StarterKit({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    exam: 'UPSC CSE',
  });

  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setErrorMsg('Enter valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitLead({
        fullName: formData.name,
        mobile: formData.mobile,
        exam: formData.exam,
        source: 'Free Starter Kit Download',
        centre: `${activeCity} Centre`,
      });

      if (res.success) {
        setDownloadReady(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
        });
      } else {
        setErrorMsg('Error generating download. Try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="starterkit-section" id="starterkit">
      <div className="container">
        <div className="starterkit-banner">
          {/* Left: Kit Visual */}
          <div className="starterkit-visual">
            <span className="starterkit-free-badge">FREE</span>
            <img
              src="/assets/starter_kit.jpg"
              alt="UPSC / UPPCS Civil Services Starter Kit"
              className="starterkit-img"
            />
          </div>

          {/* Center: Info & Checklist */}
          <div className="starterkit-info">
            <h2 className="starterkit-title">
              Get Your <span className="starterkit-title-gold">FREE</span> UPSC/UPPCS <br />
              Starter Kit
            </h2>
            <p className="starterkit-subtitle">
              Download a comprehensive kit including syllabus checklist, booklist, study planner and expert tips curated by Dhyeya IAS {activeCity} senior mentors.
            </p>

            <div className="starterkit-pills-grid">
              <div className="starterkit-pill-item">
                <span className="starterkit-pill-icon">
                  <FileCheck size={16} />
                </span>
                <span>Syllabus Checklist</span>
              </div>

              <div className="starterkit-pill-item">
                <span className="starterkit-pill-icon">
                  <BookOpen size={16} />
                </span>
                <span>Recommended Booklist</span>
              </div>

              <div className="starterkit-pill-item">
                <span className="starterkit-pill-icon">
                  <Calendar size={16} />
                </span>
                <span>Study Planner</span>
              </div>

              <div className="starterkit-pill-item">
                <span className="starterkit-pill-icon">
                  <Target size={16} />
                </span>
                <span>Preparation Strategy</span>
              </div>
            </div>
          </div>

          {/* Right: Instant Form */}
          <div className="starterkit-form-card">
            {!downloadReady ? (
              <form className="starterkit-form" onSubmit={handleDownload}>
                <div className="kit-input-group">
                  <label className="kit-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="kit-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="kit-input-group">
                  <label className="kit-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="kit-input"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>

                <div className="kit-input-group">
                  <label className="kit-label">Select Exam</label>
                  <select
                    name="exam"
                    className="kit-select"
                    value={formData.exam}
                    onChange={handleChange}
                  >
                    <option value="UPSC CSE">UPSC CSE</option>
                    <option value="UPPCS">UPPCS</option>
                    <option value="Both UPSC & UPPCS">Both UPSC &amp; UPPCS</option>
                  </select>
                </div>

                {errorMsg && (
                  <p style={{ color: '#ef4444', fontSize: '0.74rem' }}>{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-kit-download"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Study Kit</span>
                      <Download size={15} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="kit-success-box">
                <CheckCircle size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
                <h4 className="kit-success-title">Your Kit Is Ready!</h4>
                <p className="kit-success-desc">
                  Download link sent to <strong>{formData.mobile}</strong>. You can also view the digital starter guide right now.
                </p>
                <button
                  type="button"
                  className="btn-instant-pdf"
                  onClick={() => onOpenLeadModal('Starter Kit Instant Download')}
                >
                  <Download size={14} />
                  <span>Access Digital PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
