import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { speechService } from '../utils/speechService';

/**
 * EligibilityChecker Component
 * Voice + Visual Eligibility Verification System.
 * Principle: ONE QUESTION PER SCREEN, NO READING REQUIRED.
 */
export default function EligibilityChecker({ selectedScheme, selectedLanguage, onEligible, onIneligible, onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResult, setShowResult] = useState(null); // 'ELIGIBLE' | 'INELIGIBLE'

  const langCode = selectedLanguage?.code || 'hi-IN';
  const questions = selectedScheme?.eligibilityQuestions || [];
  const currentQuestion = questions[questionIndex];

  const getQuestionText = (q) => {
    if (!q) return '';
    return q.text[langCode] || q.text['hi-IN'] || q.text['en-IN'];
  };

  // Speak question when current question index changes
  useEffect(() => {
    if (currentQuestion && !showResult) {
      const qText = getQuestionText(currentQuestion);
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(qText, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false)
        });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [questionIndex, showResult, langCode]);

  // Handle YES Answer
  const handleAnswerYes = () => {
    if (isSpeaking) speechService.stopSpeaking();

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(prev => prev + 1);
    } else {
      // User passed all eligibility questions!
      setShowResult('ELIGIBLE');
      speakEligibleSuccess();
    }
  };

  // Handle NO Answer
  const handleAnswerNo = () => {
    if (isSpeaking) speechService.stopSpeaking();
    setShowResult('INELIGIBLE');
    speakIneligibleNotice();
  };

  // Speak Success Eligible Response
  const speakEligibleSuccess = () => {
    setIsSpeaking(true);
    const msg = {
      'hi-IN': 'बधाई हो! आप इस योजना के लिए पूरी तरह योग्य हैं। चलिए आवेदन शुरू करते हैं।',
      'ta-IN': 'வாழ்த்துக்கள்! இந்த திட்டத்திற்கு நீங்கள் தகுதியுடையவர். விண்ணப்பத்தைத் தொடங்குவோம்.',
      'te-IN': 'అభినందనలు! మీరు ఈ పథకానికి పూర్తిగా అర్హులు. దరఖాస్తును ప్రారంభిద్దాం.',
      'kn-IN': 'ಅಭಿನಂದನೆಗಳು! ನೀವು ಈ ಯೋಜನೆಗೆ ಸಂಪೂರ್ಣ ಅರ್ಹರಾಗಿದ್ದೀರಿ.',
      'bn-IN': 'অভিনন্দন! আপনি এই প্রকল্পের জন্য সম্পূর্ণ যোগ্য।',
      'mr-IN': 'अभिनंदन! तुम्ही या योजनेसाठी पात्र आहात.',
      'en-IN': 'Congratulations! You are fully eligible for this scheme. Let us start!'
    }[langCode] || 'Congratulations! You are eligible!';

    speechService.speak(msg, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (onEligible) onEligible(selectedScheme);
      },
      onError: () => {
        setIsSpeaking(false);
        if (onEligible) onEligible(selectedScheme);
      }
    });
  };

  // Speak Ineligible Guidance Response
  const speakIneligibleNotice = () => {
    setIsSpeaking(true);
    const msg = {
      'hi-IN': 'कोई बात नहीं। आप दूसरी सरकारी योजनाओं का लाभ ले सकती हैं।',
      'ta-IN': 'பரவாயில்லை. நீங்கள் வேறு அரசு திட்டங்களின் பலன்களைப் பெறலாம்.',
      'te-IN': 'పర్వాలేదు. మీరు ఇతర ప్రభుత్వ పథకాల ప్రయోజనాలను పొందవచ్చు.',
      'kn-IN': 'ಪರವಾಗಿಲ್ಲ. ನೀವು ಇತರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಪ್ರಯೋಜನವನ್ನು ಪಡೆಯಬಹುದು.',
      'bn-IN': 'কোন অসুবিধা নেই। আপনি অন্য সরকারী প্রকল্পের সুবিধা নিতে পারেন।',
      'mr-IN': 'काही हरकत नाही. तुम्ही इतर सरकारी योजनांचा लाभ घेऊ शकता.',
      'en-IN': 'No problem. You can explore other government schemes suitable for you.'
    }[langCode] || 'No problem. Let us check other schemes.';

    speechService.speak(msg, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (onIneligible) onIneligible(selectedScheme);
      },
      onError: () => {
        setIsSpeaking(false);
        if (onIneligible) onIneligible(selectedScheme);
      }
    });
  };

  // Replay Question
  const handleReplayQuestion = () => {
    if (currentQuestion) {
      setIsSpeaking(true);
      speechService.speak(getQuestionText(currentQuestion), langCode, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }
  };

  return (
    <div className="eligibility-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      
      {/* Mascot Avatar */}
      <Avatar 
        isSpeaking={isSpeaking}
        isListening={false}
        isConfirmed={showResult === 'ELIGIBLE'}
      />

      {/* Scheme Header Tag */}
      <div className="scheme-header-tag">
        <span className="scheme-tag-icon">{selectedScheme.icon}</span>
        <span className="scheme-tag-name">{selectedScheme.name}</span>
      </div>

      {!showResult ? (
        <>
          {/* Question Progress Pill */}
          <div className="step-progress-pill">
            <span>📋 पात्रता जांच • Check Eligibility</span>
            <span>({questionIndex + 1} / {questions.length})</span>
          </div>

          {/* Question Card */}
          <div className="eligibility-question-card">
            <div className="question-icon-circle">
              {currentQuestion.icon}
            </div>

            <h2 className="question-spoken-text">
              {getQuestionText(currentQuestion)}
            </h2>

            {/* Pointing Hand */}
            <div className="bouncing-hand-anim" style={{ fontSize: '36px' }}>👇</div>

            {/* Touch Answer Buttons */}
            <div className="touch-cards-grid">
              <button 
                className="warm-btn btn-yes-warm" 
                onClick={handleAnswerYes}
                disabled={isSpeaking}
                aria-label="Confirm YES"
              >
                <span className="btn-icon">✓</span>
                <span className="btn-txt">हाँ • YES</span>
              </button>

              <button 
                className="warm-btn btn-no-warm" 
                onClick={handleAnswerNo}
                disabled={isSpeaking}
                aria-label="Reject NO"
              >
                <span className="btn-icon">✕</span>
                <span className="btn-txt">नहीं • NO</span>
              </button>
            </div>

            <button className="replay-link-warm" onClick={handleReplayQuestion} style={{ marginTop: '8px' }}>
              🔊 फिर से सुनें • Replay Question
            </button>
          </div>
        </>
      ) : showResult === 'ELIGIBLE' ? (
        /* Eligible Celebration Result */
        <div className="completion-card-warm">
          <div className="completion-emoji">🎉 🌟 🎉</div>
          <h2 className="completion-title">आप पात्र हैं! • You are Eligible!</h2>
          <p className="completion-subtitle">
            आप {selectedScheme.name} की सभी शर्तों को पूरा करती हैं।
          </p>
          <div className="completion-badge">
            {selectedScheme.benefitText}
          </div>
        </div>
      ) : (
        /* Ineligible Guidance Result */
        <div className="ineligible-card-warm">
          <div className="ineligible-emoji">ℹ️</div>
          <h2 className="ineligible-title">दूसरी योजना देखें</h2>
          <p className="ineligible-subtitle">
            आपकी जानकारी के अनुसार दूसरी योजनाएं उपलब्ध हैं।
          </p>
          <button className="btn-reset-guided" onClick={onBack}>
            ↻ दूसरी योजना चुनें • Choose Other Scheme
          </button>
        </div>
      )}

    </div>
  );
}
