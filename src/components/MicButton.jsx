import React from 'react';

/**
 * MicButton Component
 * Golden amber glowing microphone sphere with clean pointing hand tutorial guide.
 * Matches exact visual reference design.
 */
export default function MicButton({ onClick, isListening, showTutorial, disabled }) {
  return (
    <div className="mic-container-warm">
      
      {/* Pointing Hand Tutorial Guide (Pointing DOWN directly at mic button) */}
      {showTutorial && !isListening && (
        <div className="hand-pointer-wrapper">
          <div className="hand-down-emoji">👇</div>
        </div>
      )}

      {/* Main Golden Mic Orb */}
      <button 
        className={`golden-mic-orb ${isListening ? 'orb-listening' : ''}`}
        onClick={onClick}
        disabled={disabled}
        aria-label="Activate Microphone"
      >
        {/* Soft Glowing Outer Halo */}
        <div className="golden-halo-ring"></div>

        {/* Mic Icon */}
        <div className="mic-icon-center">
          <svg className="mic-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#4A1E0B"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19v4M8 23h8" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Pulse Effect when Listening */}
        {isListening && (
          <div className="pulse-rings">
            <span className="p-ring r1"></span>
            <span className="p-ring r2"></span>
          </div>
        )}
      </button>

    </div>
  );
}
