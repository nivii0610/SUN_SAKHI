import React from 'react';

/**
 * SUN SAKHI Avatar Component
 * Light, warm, friendly solar avatar matching the exact design spec.
 */
export default function Avatar({ isSpeaking, isListening, isConfirmed }) {
  return (
    <div className="avatar-hero-warm">
      {/* Sun Icon Disc with Glowing Halo */}
      <div className={`sun-disc-wrapper ${isSpeaking ? 'speaking-active' : ''} ${isListening ? 'listening-active' : ''}`}>
        
        {/* Soft Glowing Backlight Halo */}
        <div className="sun-halo"></div>

        {/* Sun Sphere */}
        <div className="sun-sphere">
          <div className="sun-inner-icon">☀️</div>
        </div>

        {/* Status Badge Pill */}
        <div className="sun-badge-pill">
          {isSpeaking && <span className="badge-txt">🔊 SPEAKING</span>}
          {isListening && <span className="badge-txt">🎙️ LISTENING</span>}
          {isConfirmed && <span className="badge-txt">✨ READY</span>}
          {!isSpeaking && !isListening && !isConfirmed && (
            <span className="badge-txt">👋 HI!</span>
          )}
        </div>
      </div>

      {/* Brand Header */}
      <div className="brand-text-block">
        <h1 className="brand-title-warm">SUN SAKHI</h1>
        <p className="brand-subtitle-warm">आवाज़ सखी • Your Voice Companion</p>
      </div>
    </div>
  );
}
