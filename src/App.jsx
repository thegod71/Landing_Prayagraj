import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Solution from './components/Solution';
import Results from './components/Results';
import StarterKit from './components/StarterKit';
import Programmes from './components/Programmes';
import CampusExperience from './components/CampusExperience';
import FAQ from './components/FAQ';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import FullscreenLeadModal from './components/FullscreenLeadModal';
import AutoPopupModal from './components/AutoPopupModal';
import { Sparkles } from 'lucide-react';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Floating Action');
  const [activeCity, setActiveCity] = useState('Prayagraj'); // Default to Prayagraj as per image, with seamless Lucknow toggle

  const handleOpenModal = (source = 'Direct Interaction') => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-wrapper">
      {/* 1. Navbar */}
      <Navbar
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
        setActiveCity={setActiveCity}
      />

      {/* 2. Hero Section with Top Value Props and Roadmap Card */}
      <Hero
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 3. Feeling Stuck in Your Preparation (Pain Points) */}
      <PainPoints />

      {/* 4. Our Solution: A Structured Path to Your Success */}
      <Solution
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 5. Our Results Speak for Themselves (Toppers & Testimonials) */}
      <Results
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 6. Free UPSC/UPPCS Starter Kit Download Magnet */}
      <StarterKit
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 7. Find the Right Programme for You (4 Preparation Stages) */}
      <Programmes
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 8. Experience the Dhyeya IAS Centre (Classroom Infrastructure) */}
      <CampusExperience
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 9. Frequently Asked Questions */}
      <FAQ
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 10. Visit Our Centre (Map & Contact Details) */}
      <LocationMap
        activeCity={activeCity}
        setActiveCity={setActiveCity}
      />

      {/* 11. Footer with Socials & Disclaimer */}
      <Footer
        onOpenLeadModal={handleOpenModal}
        activeCity={activeCity}
      />

      {/* 12. FULLSCREEN Interactive Form (Requested by user) */}
      <FullscreenLeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        triggerSource={modalSource}
        activeCity={activeCity}
      />

      {/* 13. Automatic Pop-up Form when anybody opens the website */}
      <AutoPopupModal activeCity={activeCity} />

      {/* Floating CTA Button to open Fullscreen Form at any scroll position */}
      <button
        type="button"
        className="floating-roadmap-btn"
        onClick={() => handleOpenModal('Floating Pill')}
        title="Open Fullscreen Roadmap & Assessment Form"
      >
        <Sparkles size={16} />
        <span>Get 1-on-1 Roadmap Form</span>
      </button>
    </div>
  );
}
