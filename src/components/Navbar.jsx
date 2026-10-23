import React from 'react';
import { GraduationCap, BookOpen, Users, Target, Phone, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenLeadModal, activeCity = 'Prayagraj', setActiveCity }) {
  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo matching the original image */}
        <a href="#hero" className="brand-link">
          <div className="brand-emblem">
            <span className="brand-emblem-inner">☀️</span>
          </div>
          <div className="brand-text-col">
            <div className="brand-title-row">
              <span className="brand-name">DHYEYA IAS</span>
            </div>
            <span className="brand-subline">most trusted since 2006</span>
            <span className="brand-city-badge">
              📍 {activeCity.toUpperCase()}
            </span>
          </div>
        </a>

        {/* 4 Pillars from Reference Mockup */}
        <div className="nav-features">
          <div className="nav-feature-item">
            <span className="nav-feature-icon">
              <GraduationCap size={18} />
            </span>
            <span className="nav-feature-text">Expert Faculty</span>
          </div>
          <div className="nav-feature-item">
            <span className="nav-feature-icon">
              <BookOpen size={18} />
            </span>
            <span className="nav-feature-text">Structured Study System</span>
          </div>
          <div className="nav-feature-item">
            <span className="nav-feature-icon">
              <Users size={18} />
            </span>
            <span className="nav-feature-text">Personal Mentorship</span>
          </div>
          <div className="nav-feature-item">
            <span className="nav-feature-icon">
              <Target size={18} />
            </span>
            <span className="nav-feature-text">Result Oriented Approach</span>
          </div>
        </div>

        {/* City Toggle & CTA Actions */}
        <div className="nav-actions">
          {setActiveCity && (
            <div className="city-pill-selector" title="Select Centre">
              <button
                type="button"
                className={`city-pill-btn ${activeCity === 'Prayagraj' ? 'active' : ''}`}
                onClick={() => setActiveCity('Prayagraj')}
              >
                Prayagraj
              </button>
              {/* <button
                type="button"
                className={`city-pill-btn ${activeCity === 'Lucknow' ? 'active' : ''}`}
                onClick={() => setActiveCity('Lucknow')}
              >
                Lucknow
              </button> */}
            </div>
          )}

          

          <button
            type="button"
            className="btn-nav-counselling"
            onClick={() => onOpenLeadModal('Navbar CTA')}
          >
            <Sparkles size={14} />
            <span>Book Free Counselling</span>
          </button>
        </div>
      </div>
    </header>
  );
}
