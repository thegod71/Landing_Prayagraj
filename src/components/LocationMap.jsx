import React, { useState } from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import './LocationMap.css';

export default function LocationMap({ activeCity = 'Prayagraj', setActiveCity }) {
  const [mapMode, setMapMode] = useState('google'); // 'google' or 'satellite'

  const centers = {
    Prayagraj: {
      name: 'Dhyeya IAS, Prayagraj',
      address: 'Civil Lines, Prayagraj, Uttar Pradesh',
      timing1: 'Mon - Sat: 8:00 AM - 7:00 PM',
      timing2: 'Sunday: 10:00 AM - 5:00 PM',
      // Verified working Google Maps embed without X-Frame-Options blocking
      googleEmbedUrl:
        'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s25.4523,81.8330!6i15!3m1!1sen!5m1!1sen',
      directMapUrl:
        'https://www.google.com/maps/search/?api=1&query=Dhyeya+IAS+Civil+Lines+Prayagraj+Uttar+Pradesh',
      pinLabel: 'Dhyeya IAS Prayagraj',
    },
    Lucknow: {
      name: 'Dhyeya IAS, Lucknow',
      address: 'Hazratganj, Lucknow, Uttar Pradesh',
      timing1: 'Mon - Sat: 8:00 AM - 7:30 PM',
      timing2: 'Sunday: 10:00 AM - 5:00 PM',
      // Verified working Google Maps embed without X-Frame-Options blocking
      googleEmbedUrl:
        'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s26.8500,80.9499!6i15!3m1!1sen!5m1!1sen',
      directMapUrl:
        'https://www.google.com/maps/search/?api=1&query=Dhyeya+IAS+Hazratganj+Lucknow+Uttar+Pradesh',
      pinLabel: 'Dhyeya IAS Lucknow',
    },
  };

  const current = centers[activeCity] || centers.Prayagraj;

  return (
    <section className="location-section" id="location">
      <div className="container">
        <h2 className="location-title">
          Visit Our Centre in {activeCity}
        </h2>

        <div className="location-grid">
          {/* Left: Clean, minimal layout exactly matching the reference screenshot */}
          <div className="location-left-details">
            <div className="loc-item-row">
              <div className="loc-icon-gold">
                <MapPin size={24} />
              </div>
              <div className="loc-text-col">
                <h4 className="loc-heading-white">{current.name}</h4>
                <p className="loc-sub-grey">{current.address}</p>
              </div>
            </div>

            <div className="loc-item-row">
              <div className="loc-icon-gold">
                <Clock size={24} />
              </div>
              <div className="loc-text-col">
                <p className="loc-heading-white">{current.timing1}</p>
                <p className="loc-sub-grey">{current.timing2}</p>
              </div>
            </div>

            {/* Subtle City Switcher */}
            {setActiveCity && (
              <div className="loc-city-switch-row">
                <span className="loc-switch-label">Select City:</span>
                <button
                  type="button"
                  className={`loc-city-btn ${activeCity === 'Prayagraj' ? 'active' : ''}`}
                  onClick={() => setActiveCity('Prayagraj')}
                >
                  Prayagraj
                </button>
                <button
                  type="button"
                  className={`loc-city-btn ${activeCity === 'Lucknow' ? 'active' : ''}`}
                  onClick={() => setActiveCity('Lucknow')}
                >
                  Lucknow
                </button>
              </div>
            )}
          </div>

          {/* Right: Map with working Google Map and screenshot-matched Satellite option */}
          <div className="location-map-wrapper">
            <div className="map-view-switcher">
              <button
                type="button"
                className={`map-mode-btn ${mapMode === 'google' ? 'active' : ''}`}
                onClick={() => setMapMode('google')}
              >
                Google Map
              </button>
              <button
                type="button"
                className={`map-mode-btn ${mapMode === 'satellite' ? 'active' : ''}`}
                onClick={() => setMapMode('satellite')}
              >
                Dark Satellite
              </button>
              <a
                href={current.directMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-open-app-btn"
                title="Open in Google Maps App"
              >
                <ExternalLink size={12} />
                <span>Open in App</span>
              </a>
            </div>

            {mapMode === 'google' ? (
              <iframe
                key={activeCity}
                title={`Google Map - ${current.name}`}
                src={current.googleEmbedUrl}
                className="google-map-embed-frame"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* Dark Night-Mode Satellite Vector matching the screenshot */
              <div
                className="screenshot-styled-map"
                onClick={() => window.open(current.directMapUrl, '_blank')}
                title="Click to open directions in Google Maps"
              >
                <svg className="screenshot-map-svg" viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg">
                  <rect width="700" height="360" fill="#0d1f36" />
                  
                  {/* Rivers / Confluence */}
                  <path d="M-20,320 Q200,270 420,310 T720,290" fill="none" stroke="#173154" strokeWidth="44" />
                  <path d="M-20,320 Q200,270 420,310 T720,290" fill="none" stroke="#1d3f6d" strokeWidth="34" />
                  
                  {/* Roads Grid */}
                  <path d="M0,80 L700,100 M0,180 L700,165 M0,270 L700,250 M140,0 L160,360 M320,0 L310,360 M480,0 L500,360 M620,0 L640,360" stroke="#1b3456" strokeWidth="2.5" />
                  <path d="M40,30 L660,330 M640,30 L60,330" stroke="#254673" strokeWidth="1.8" strokeDasharray="4 4" />
                  
                  {/* Highway route */}
                  <path d="M0,150 C200,170 380,120 700,200" fill="none" stroke="#365e96" strokeWidth="3.5" />
                  <path d="M100,0 C220,150 450,220 600,360" fill="none" stroke="#c88a22" strokeWidth="2.5" opacity="0.6" />
                </svg>

                {/* Red Pin Marker with text label matching the screenshot */}
                <div className="screenshot-red-pin">
                  <div className="red-pin-circle">
                    <div className="red-pin-inner-dot"></div>
                  </div>
                  <span className="red-pin-text">{current.pinLabel}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
