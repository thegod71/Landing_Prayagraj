import React from 'react';
import { BookOpen, Target, BarChart3, Clock } from 'lucide-react';
import './PainPoints.css';

const painPointsData = [
  {
    id: 1,
    title: 'Too Many Sources',
    description: 'Confusion about what to study and what to skip.',
    solution: 'Curated concise handouts & 1 standard textbook per subject.',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'No Clear Strategy',
    description: 'Uncertainty about Prelims, Mains and Optional preparation.',
    solution: 'Integrated 3-phase syllabus roadmap with weekly milestones.',
    icon: Target,
  },
  {
    id: 3,
    title: 'Lack of Guidance',
    description: 'No personalized feedback or proper mentorship.',
    solution: 'Weekly 1-on-1 mentor sessions & 48-hr answer copy evaluation.',
    icon: BarChart3,
  },
  {
    id: 4,
    title: 'Inconsistent Preparation',
    description: 'Difficulty in maintaining discipline and revision.',
    solution: 'Daily classroom test series, study group routines & revision marathons.',
    icon: Clock,
  },
];

export default function PainPoints() {
  return (
    <section className="painpoints-section" id="painpoints">
      <div className="container">
        <div className="painpoints-header">
          <h2 className="painpoints-title">Feeling Stuck in Your Preparation?</h2>
          <p className="painpoints-subtitle">
            You're not alone. Most aspirants face the same challenges.
          </p>
        </div>

        <div className="painpoints-grid">
          {painPointsData.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="painpoint-card">
                <div className="painpoint-icon-wrapper">
                  <Icon size={22} />
                </div>
                <h3 className="painpoint-card-title">{item.title}</h3>
                <p className="painpoint-card-desc">{item.description}</p>
                <div className="painpoint-solution-tag">
                  <strong>The Dhyeya Advantage:</strong>
                  {item.solution}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
