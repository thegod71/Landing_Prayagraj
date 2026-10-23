import React from 'react';
import { GraduationCap, TrendingUp, RefreshCw, FileText, ArrowRight } from 'lucide-react';
import './Programmes.css';

const programmesData = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Just starting your preparation journey.',
    icon: GraduationCap,
    highlights: ['2-Year Foundation Batch', 'NCERT Baseline Modules', 'Basics to Advance Progression'],
  },
  {
    id: 'preparing',
    title: 'Currently Preparing',
    description: 'Need structured guidance and practice.',
    icon: TrendingUp,
    highlights: ['1-Year GS Pre-cum-Mains', 'Comprehensive CSAT', 'Weekly Answer Writing & Review'],
  },
  {
    id: 'repeater',
    title: 'Repeat Aspirant',
    description: 'Looking to improve your previous attempt.',
    icon: RefreshCw,
    highlights: ['Target Rank Booster Batch', 'Optional Subject Specialization', 'All-India Mock Test Series'],
  },
  {
    id: 'prelims_qualified',
    title: 'Prelims Qualified',
    description: 'Mains-focused preparation and answer writing.',
    icon: FileText,
    highlights: ['Mains Crash Course (GS 1-4)', 'Essay & Ethics Mentorship', 'Board Interview Simulation'],
  },
];

export default function Programmes({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  return (
    <section className="programmes-section" id="programmes">
      <div className="container">
        <div className="programmes-header">
          <h2 className="programmes-title">Find the Right Programme for You</h2>
          <p className="programmes-subtitle">
            Choose your current preparation stage and get personalised course recommendations for {activeCity} Centre.
          </p>
        </div>

        <div className="programmes-grid">
          {programmesData.map((prog) => {
            const Icon = prog.icon;
            return (
              <div key={prog.id} className="programme-card">
                <div className="programme-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3 className="programme-card-title">{prog.title}</h3>
                <p className="programme-card-desc">{prog.description}</p>

                <div className="programme-courses-list">
                  {prog.highlights.map((h, i) => (
                    <span key={i} className="programme-course-tag">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-view-programmes"
                  onClick={() => onOpenLeadModal(`Programme: ${prog.title}`)}
                >
                  <span>View Programmes</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
