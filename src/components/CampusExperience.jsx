import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import './CampusExperience.css';

export default function CampusExperience({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const highlights = [
    'Comfortable classrooms with modern facilities',
    'Regular doubt sessions and mentorship',
    'Conducive environment for focused preparation',
    `Located in the heart of ${activeCity}`,
  ];

  return (
    <section className="campusexperience-section" id="centre-experience">
      <div className="container">
        <div className="campusexperience-grid">
          {/* Left: Authentic Prayagraj Classroom Photo matching original screenshot */}
          <div className="campus-image-card">
            <img
              src="/assets/prayagraj_classroom.jpg"
              alt={`Experience the Dhyeya IAS ${activeCity} Centre Classroom`}
              className="campus-img"
            />
            <div className="campus-image-inner-shadow"></div>
          </div>

          {/* Right: Points & CTA matching original screenshot */}
          <div className="campus-content">
            <h2 className="campus-title">
              Experience the Dhyeya IAS <br />
              {activeCity} Centre
            </h2>

            <div className="campus-checklist">
              {highlights.map((point, index) => (
                <div key={index} className="campus-check-item">
                  <div className="campus-check-icon">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="campus-check-text">{point}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-book-counselling"
              onClick={() => onOpenLeadModal(`Campus Visit: ${activeCity} Centre`)}
            >
              <span>Book a Free Counselling Session</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
