import React from 'react';
import { BookOpen, FileCheck, Users, Target, ArrowRight } from 'lucide-react';
import './Solution.css';

export default function Solution({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  return (
    <section className="solution-section" id="solution">
      <div className="container">
        <div className="solution-grid">
          {/* Left Column Content */}
          <div className="solution-left">
            <div className="solution-pill">
              <span>OUR SOLUTION</span>
            </div>

            <h2 className="solution-title">
              A Structured Path <br />
              to Your Success.
            </h2>

            <p className="solution-desc">
              At Dhyeya IAS {activeCity}, we provide comprehensive preparation support with expert faculty, regular practice and continuous mentorship.
            </p>

            {/* 4 Feature Points with Icons from Mockup */}
            <div className="solution-features-grid">
              <div className="solution-feature-box">
                <div className="solution-feature-icon">
                  <BookOpen size={20} />
                </div>
                <div className="solution-feature-name">
                  Comprehensive Syllabus Coverage
                </div>
              </div>

              <div className="solution-feature-box">
                <div className="solution-feature-icon">
                  <FileCheck size={20} />
                </div>
                <div className="solution-feature-name">
                  Regular Test Series &amp; Performance Analysis
                </div>
              </div>

              <div className="solution-feature-box">
                <div className="solution-feature-icon">
                  <Users size={20} />
                </div>
                <div className="solution-feature-name">
                  Expert Mentorship &amp; Doubt Resolution
                </div>
              </div>

              <div className="solution-feature-box">
                <div className="solution-feature-icon">
                  <Target size={20} />
                </div>
                <div className="solution-feature-name">
                  Current Affairs &amp; Revision Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Classroom Image with Soft Shaded Edge */}
          <div className="solution-right">
            <div className="solution-image-shade-container">
              <img
                src="/assets/faculty_classroom.jpg"
                alt="Dhyeya IAS Faculty explaining UPSC Strategy in classroom"
                className="solution-shade-img"
              />
              <div className="solution-shade-vignette"></div>
              <div className="solution-image-badge">
                <div className="solution-badge-text">
                  <span className="solution-badge-title">Interactive Faculty Strategy Session</span>
                  <span className="solution-badge-sub">Prelims ➔ Mains ➔ Interview Mastery</span>
                </div>
                <button
                  type="button"
                  className="btn-solution-explore"
                  onClick={() => onOpenLeadModal('Classroom Strategy Session')}
                >
                  Join Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
