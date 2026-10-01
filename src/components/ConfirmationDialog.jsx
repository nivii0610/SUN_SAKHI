import React from 'react';

/**
 * ConfirmationDialog Component
 * High-contrast warm YES/NO touch cards matching the cream & terracotta theme.
 */
export default function ConfirmationDialog({ detectedLang, onConfirm, onReject, onReplayAudio }) {
  if (!detectedLang) return null;

  return (
    <div className="confirm-card-warm">
      {/* Detected Language Pill */}
      <div className="lang-badge-warm">
        <span className="badge-globe">🌐</span>
        <span className="native-title-warm">{detectedLang.nativeName}</span>
        <span className="english-title-warm">({detectedLang.name})</span>
      </div>

      {/* Confirmation Spoken Question Text */}
      <p className="confirm-text-warm">
        {detectedLang.confirmPrompt}
      </p>

      {/* Huge YES / NO Touch Cards */}
      <div className="touch-cards-grid">
        {/* YES BUTTON */}
        <button className="warm-btn btn-yes-warm" onClick={onConfirm} aria-label="Confirm YES">
          <span className="btn-icon">✓</span>
          <span className="btn-txt">हाँ • YES</span>
        </button>

        {/* NO BUTTON */}
        <button className="warm-btn btn-no-warm" onClick={onReject} aria-label="Reject NO">
          <span className="btn-icon">✕</span>
          <span className="btn-txt">नहीं • NO</span>
        </button>
      </div>

      {/* Replay Audio */}
      <button className="replay-link-warm" onClick={onReplayAudio}>
        🔊 फिर से सुनें • Replay Audio
      </button>
    </div>
  );
}
