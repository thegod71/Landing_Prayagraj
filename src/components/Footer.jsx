import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-main-row">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-emblem">☀️</div>
            <div>
              <span className="footer-brand-title">DHYEYA IAS</span>
              <span className="footer-brand-sub">most trusted since 2006 • {activeCity.toUpperCase()}</span>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links-group">
            <button
              type="button"
              className="footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              onClick={() => onOpenLeadModal('Footer Privacy Inquiry')}
            >
              Privacy Policy
            </button>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <button
              type="button"
              className="footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              onClick={() => onOpenLeadModal('Footer Terms Inquiry')}
            >
              Terms &amp; Conditions
            </button>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <button
              type="button"
              className="footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              onClick={() => onOpenLeadModal('Student Portal Assistance')}
            >
              Student Portal
            </button>
          </div>

          {/* Socials with custom SVG icons */}
          <div className="footer-social-group">
            <span className="footer-social-label">Follow Us:</span>
            <a
              href="https://youtube.com/@dhyeyaias"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-link social-yt"
              aria-label="YouTube"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/dhyeyaias"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-link social-ig"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://facebook.com/dhyeyaias"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-link social-fb"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="footer-bottom-row">
          <p>
            © 2006-2026 Dhyeya IAS {activeCity}. All Rights Reserved. | Dedicated to Nation Building Through Education.
          </p>
          <button
            type="button"
            className="btn-scroll-top"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
