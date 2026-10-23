import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Star, BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';
import './Results.css';

const achieversData = [
  {
    id: 1,
    name: 'Aman Singh',
    exam: 'UPSC CSE',
    category: 'upsc',
    badgeClass: 'upsc',
    rank: 'AIR 42 • IAS',
    optional: 'PSIR (Political Science)',
    avatar: '/assets/topper_aman.jpg',
    quote:
      'The structured courses and constant mentorship at Dhyeya IAS Prayagraj helped me stay focused and confident throughout my journey.',
    strategy:
      'Daily 3-hour answer writing and faculty copy evaluation in Prayagraj gave me clarity. GS Paper 2 & 4 marks improved by 40+ marks with Dhyeya test series.',
    batch: 'Foundation Classroom Batch',
  },
  {
    id: 2,
    name: 'Ritika Sharma',
    exam: 'UPPCS',
    category: 'uppcs',
    badgeClass: 'uppcs',
    rank: 'Rank 5 • SDM',
    optional: 'Geography',
    avatar: '/assets/topper_ritika.jpg',
    quote:
      'The test series and answer writing guidance really improved my preparation. The support from faculty was exceptional.',
    strategy:
      'UP Special GS-5 and GS-6 papers were covered exhaustively by Dhyeya faculty. Precise notes and mock interviews were the key to my top-5 state rank.',
    batch: '1-Year Pre-cum-Mains Batch',
  },
  {
    id: 3,
    name: 'Vivek Tiwari',
    exam: 'UPSC CSE',
    category: 'upsc',
    badgeClass: 'upsc',
    rank: 'AIR 78 • IPS',
    optional: 'History',
    avatar: '/assets/topper_vivek.jpg',
    quote:
      'Dhyeya IAS provided me the right direction, best faculty and a disciplined environment to crack the exam.',
    strategy:
      'Focused strictly on standard books + Dhyeya monthly current affairs digest. Weekly mock tests simulated real exam pressure.',
    batch: 'Target Mentorship Batch',
  },
  {
    id: 4,
    name: 'Sneha Verma',
    exam: 'UPPCS',
    category: 'uppcs',
    badgeClass: 'uppcs',
    rank: 'Rank 11 • DSP',
    optional: 'Hindi Literature',
    avatar: '/assets/topper_sneha.jpg',
    quote:
      'Regular tests, doubt sessions and personal guidance made a huge difference in my preparation.',
    strategy:
      'Consistent revision and 1-on-1 mentor sessions cleared my conceptual hurdles. Dhyeya library environment kept my daily 9-hour routine on track.',
    batch: 'Classroom & Test Series Batch',
  },
];

export default function Results({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const [filter, setFilter] = useState('all');
  const [startIndex, setStartIndex] = useState(0);
  const [selectedTopper, setSelectedTopper] = useState(null);

  const filteredAchievers = filter === 'all'
    ? achieversData
    : achieversData.filter((a) => a.category === filter);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % filteredAchievers.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + filteredAchievers.length) % filteredAchievers.length);
  };

  return (
    <section className="results-section" id="results">
      <div className="container">
        {/* Header Row */}
        <div className="results-header-row">
          <div className="results-header-left">
            <h2 className="results-title">Our Results Speak for Themselves</h2>
            <p className="results-subtitle">
              Our students are serving the nation in various civil services across India.
            </p>

            {/* Creative Filter Tabs */}
            <div className="toppers-filter-pills">
              <button
                type="button"
                className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setFilter('all');
                  setStartIndex(0);
                }}
              >
                All Toppers ({achieversData.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === 'upsc' ? 'active' : ''}`}
                onClick={() => {
                  setFilter('upsc');
                  setStartIndex(0);
                }}
              >
                UPSC CSE (IAS / IPS)
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === 'uppcs' ? 'active' : ''}`}
                onClick={() => {
                  setFilter('uppcs');
                  setStartIndex(0);
                }}
              >
                UPPCS (SDM / DSP)
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-view-stories"
            onClick={() => onOpenLeadModal('Topper Stories Wall')}
          >
            <span>View More Success Stories</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="results-carousel-container">
          <button
            type="button"
            className="carousel-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous achiever"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="results-cards-grid">
            {filteredAchievers.map((item, idx) => {
              const displayIndex = (startIndex + idx) % filteredAchievers.length;
              const achiever = filteredAchievers[displayIndex];

              return (
                <div
                  key={achiever.id}
                  className="achiever-card"
                  onClick={() => setSelectedTopper(achiever)}
                  title="Click to view preparation strategy"
                >
                  <div className="achiever-card-glow"></div>

                  <div className="achiever-avatar-wrapper">
                    <img
                      src={achiever.avatar}
                      alt={achiever.name}
                      className="achiever-avatar"
                    />
                    <div className="achiever-verified-badge" title="Verified Dhyeya Rankholder">
                      <Award size={12} />
                    </div>
                  </div>

                  <h3 className="achiever-name">{achiever.name}</h3>

                  <div className="achiever-rank-pill">
                    <span>{achiever.rank}</span>
                  </div>

                  <span className={`achiever-badge ${achiever.badgeClass}`}>
                    {achiever.exam}
                  </span>

                  <p className="achiever-quote">{achiever.quote}</p>

                  <button
                    type="button"
                    className="btn-read-strategy"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTopper(achiever);
                    }}
                  >
                    <span>Read Strategy</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-nav-btn next"
            onClick={handleNext}
            aria-label="Next achiever"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Creative Spotlight Modal: Topper Strategy & Roadmap */}
        {selectedTopper && (
          <div className="topper-modal-overlay" onClick={() => setSelectedTopper(null)}>
            <div className="topper-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="btn-close-topper-modal"
                onClick={() => setSelectedTopper(null)}
              >
                <X size={18} />
              </button>

              <div className="topper-modal-header">
                <div className="topper-modal-avatar-box">
                  <img
                    src={selectedTopper.avatar}
                    alt={selectedTopper.name}
                    className="topper-modal-avatar"
                  />
                  <div className="topper-modal-star">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  </div>
                </div>

                <div className="topper-modal-info">
                  <span className="topper-modal-badge">{selectedTopper.exam} SUCCESS STORY</span>
                  <h3 className="topper-modal-name">{selectedTopper.name}</h3>
                  <p className="topper-modal-rank">
                    🏆 <strong>{selectedTopper.rank}</strong> • {selectedTopper.batch}
                  </p>
                </div>
              </div>

              <div className="topper-modal-body">
                <div className="topper-modal-stat-grid">
                  <div className="topper-stat-box">
                    <span className="stat-label-mini">Optional Subject</span>
                    <span className="stat-val-mini">{selectedTopper.optional}</span>
                  </div>
                  <div className="topper-stat-box">
                    <span className="stat-label-mini">Centre Studied</span>
                    <span className="stat-val-mini">{activeCity} Flagship</span>
                  </div>
                </div>

                <div className="topper-strategy-quote-box">
                  <h5 className="strategy-heading">
                    <BookOpen size={15} color="#c88a22" />
                    <span>Preparation Strategy &amp; Secret:</span>
                  </h5>
                  <p className="strategy-text">"{selectedTopper.strategy}"</p>
                </div>

                <button
                  type="button"
                  className="btn-topper-roadmap-cta"
                  onClick={() => {
                    setSelectedTopper(null);
                    onOpenLeadModal(`Follow ${selectedTopper.name} Roadmap`);
                  }}
                >
                  <Sparkles size={16} />
                  <span>Get Strategy Plan Followed by {selectedTopper.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
