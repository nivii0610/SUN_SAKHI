import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { GOVERNMENT_SCHEMES } from '../data/governmentServices';
import { speechService } from '../utils/speechService';

/**
 * SchemeSelector Component
 * Visual & Spoken Catalog for Government Welfare Schemes.
 */
export default function SchemeSelector({ selectedLanguage, onSelectScheme }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const langCode = selectedLanguage?.code || 'hi-IN';

  const welcomePrompt = {
    'hi-IN': 'सरकारी योजना चुनें या मुझसे बोलकर पूछें।',
    'ta-IN': 'அரசுத் திட்டத்தைத் தேர்ந்தெடுக்கவும் அல்லது பேசுங்கள்.',
    'te-IN': 'ప్రభుత్వ పథకాన్ని ఎంచుకోండి లేదా మాట్లాడండి.',
    'kn-IN': 'ಸರ್ಕಾರಿ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ.',
    'bn-IN': 'সরকারী প্রকল্প নির্বাচন করুন বা বলুন।',
    'mr-IN': 'सरकारी योजना निवडा किंवा बोला.',
    'en-IN': 'Choose a government scheme or speak to Sun Sakhi.'
  }[langCode] || 'Select a government scheme below.';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpeaking(true);
      speechService.speak(welcomePrompt, langCode, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [langCode]);

  const handleSchemeClick = (scheme) => {
    if (isSpeaking) speechService.stopSpeaking();
    if (onSelectScheme) onSelectScheme(scheme);
  };

  return (
    <div className="scheme-selector-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      
      {/* Mascot Avatar */}
      <Avatar 
        isSpeaking={isSpeaking}
        isListening={false}
        isConfirmed={false}
      />

      <div className="scheme-selector-banner">
        <h2 className="selector-title">सरकारी योजनाएँ • Government Schemes</h2>
        <p className="selector-subtext">योजना को छुएं और अपनी पात्रता जांचें</p>
      </div>

      {/* Scheme Visual Cards List */}
      <div className="schemes-grid">
        {GOVERNMENT_SCHEMES.map((scheme) => (
          <button 
            key={scheme.id}
            className="scheme-touch-card"
            onClick={() => handleSchemeClick(scheme)}
          >
            <div className="scheme-card-header">
              <span className="scheme-card-icon">{scheme.icon}</span>
              <span className="scheme-card-benefit">{scheme.benefitText}</span>
            </div>

            <h3 className="scheme-card-name">{scheme.name}</h3>
            <p className="scheme-card-desc">
              {scheme.prompts[langCode] || scheme.prompts['hi-IN']}
            </p>

            <div className="scheme-check-badge">
              ✓ पात्रता जांचें • Check Eligibility
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
