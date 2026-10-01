import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { speechService } from '../utils/speechService';

/**
 * LearnMode Component
 * Digital Familiarization / Learn Mode designed specifically for illiterate,
 * first-time smartphone users.
 * 
 * Flow:
 * LESSON 1 (TAP) -> LESSON 2 (MICROPHONE) -> LESSON 3 (LISTEN) -> TWO-WAY DEMO -> COMPLETE
 */
export default function LearnMode({ selectedLanguage, onComplete }) {
  // Lessons: 'L1_TAP' | 'L2_MIC' | 'L3_LISTEN' | 'L4_DEMO_SPEAK' | 'L4_DEMO_LISTEN' | 'COMPLETE'
  const [subStep, setSubStep] = useState('L1_TAP');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [userSpokenText, setUserSpokenText] = useState('');

  const langCode = selectedLanguage?.bcp47 || 'hi-IN';
  const prompts = selectedLanguage?.learnMode || {
    l1Instruction: 'बड़े गोले को छुएं।',
    l1Success: 'बहुत बढ़िया! आपने कर दिखाया।',
    l2Instruction: 'माइक्रोफ़ोन को छुएं।',
    l2Success: 'शाबाश! अब आप मुझसे बात कर सकती हैं।',
    l3Message: 'नमस्ते। मैं आपसे बात कर सकती हूँ और आपकी मदद कर सकती हूँ।',
    l3Explanation: 'अब आप समझ गईं कि मैं आपसे बात कर सकती हूँ।',
    demoQuestion: 'आपका नाम क्या है? कृपया बोलें।',
    demoResponse: 'बहुत सुंदर! मैंने आपकी आवाज़ सुन ली है।'
  };

  // LESSON 1 — Voice Instruction: "Touch the big circle."
  useEffect(() => {
    if (subStep === 'L1_TAP') {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(prompts.l1Instruction, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false)
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [subStep]);

  // Handle Lesson 1 Big Circle Tap
  const handleL1Tap = () => {
    if (isSpeaking) speechService.stopSpeaking();
    setShowSparkle(true);
    setIsSpeaking(true);

    speechService.speak(prompts.l1Success, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        // Move to Lesson 2: MICROPHONE
        setSubStep('L2_MIC');
      },
      onError: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        setSubStep('L2_MIC');
      }
    });
  };

  // LESSON 2 — Voice Instruction: "Touch the microphone."
  useEffect(() => {
    if (subStep === 'L2_MIC') {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(prompts.l2Instruction, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false)
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [subStep]);

  // Handle Lesson 2 Mic Tap
  const handleL2MicTap = () => {
    if (isSpeaking) speechService.stopSpeaking();
    setShowSparkle(true);
    setIsSpeaking(true);

    speechService.speak(prompts.l2Success, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        // Move to Lesson 3: LISTEN
        setSubStep('L3_LISTEN');
      },
      onError: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        setSubStep('L3_LISTEN');
      }
    });
  };

  // LESSON 3 — Listen Demonstration
  useEffect(() => {
    if (subStep === 'L3_LISTEN') {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        // Speak initial hello & help message
        speechService.speak(prompts.l3Message, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => {
            // Then speak explanation
            speechService.speak(prompts.l3Explanation, langCode, {
              onStart: () => setIsSpeaking(true),
              onEnd: () => {
                setIsSpeaking(false);
                // Move to Two-Way Interaction Demo
                setSubStep('L4_DEMO_SPEAK');
              },
              onError: () => {
                setIsSpeaking(false);
                setSubStep('L4_DEMO_SPEAK');
              }
            });
          },
          onError: () => {
            setIsSpeaking(false);
            setSubStep('L4_DEMO_SPEAK');
          }
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [subStep]);

  // LESSON 4 DEMO — SUN SAKHI asks question
  useEffect(() => {
    if (subStep === 'L4_DEMO_SPEAK') {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(prompts.demoQuestion, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => {
            setIsSpeaking(false);
            // Show Mic for user to speak
            setSubStep('L4_DEMO_LISTEN');
          },
          onError: () => {
            setIsSpeaking(false);
            setSubStep('L4_DEMO_LISTEN');
          }
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [subStep]);

  // Handle Lesson 4 Mic Tap by User
  const handleL4MicTap = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setIsListening(true);
    setUserSpokenText('');

    speechService.startListening({
      onStart: () => setIsListening(true),
      onResult: ({ finalTranscript, interimTranscript }) => {
        const text = finalTranscript || interimTranscript;
        setUserSpokenText(text);

        if (finalTranscript && finalTranscript.trim()) {
          speechService.stopListening();
          setIsListening(false);
          finishDemoResponse();
        }
      },
      onError: () => {
        setIsListening(false);
        finishDemoResponse();
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  // Complete Two-Way Demo Response & Finish Learn Mode
  const finishDemoResponse = () => {
    setIsSpeaking(true);
    speechService.speak(prompts.demoResponse, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        localStorage.setItem('sun_sakhi_learn_completed', 'true');
        if (onComplete) onComplete();
      },
      onError: () => {
        setIsSpeaking(false);
        localStorage.setItem('sun_sakhi_learn_completed', 'true');
        if (onComplete) onComplete();
      }
    });
  };

  return (
    <div className="learn-mode-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      
      {/* 1. Mascot Avatar displaying voice feedback */}
      <Avatar 
        isSpeaking={isSpeaking}
        isListening={isListening}
        isConfirmed={subStep === 'COMPLETE'}
      />

      {/* 2. Visual Lesson Container */}
      
      {/* LESSON 1 — TAP CIRCLE */}
      {subStep === 'L1_TAP' && (
        <div className="lesson-box">
          <div className="lesson-banner-card">
            <h2 className="lesson-heading">गोले को छुएं • Touch Circle</h2>
          </div>

          <div className="circle-lesson-area">
            <div className="bouncing-hand-anim">👇</div>
            
            <button 
              className={`big-target-circle ${showSparkle ? 'sparkle-active' : ''}`}
              onClick={handleL1Tap}
              disabled={isSpeaking}
              aria-label="Touch Circle"
            >
              <div className="inner-circle-glow"></div>
              {showSparkle && <span className="sparkle-stars">✨ 🎉 ✨</span>}
            </button>
          </div>
        </div>
      )}

      {/* LESSON 2 — MICROPHONE */}
      {subStep === 'L2_MIC' && (
        <div className="lesson-box">
          <div className="lesson-banner-card">
            <h2 className="lesson-heading">माइक्रोफ़ोन को छुएं • Touch Mic</h2>
          </div>

          <div className="circle-lesson-area">
            <div className="bouncing-hand-anim">👇</div>

            <button 
              className={`golden-mic-orb ${showSparkle ? 'orb-listening' : ''}`}
              onClick={handleL2MicTap}
              disabled={isSpeaking}
              aria-label="Touch Microphone"
            >
              <div className="golden-halo-ring"></div>
              <div className="mic-icon-center">
                <svg className="mic-svg" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#4A1E0B"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19v4M8 23h8" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* LESSON 3 — LISTEN DEMO */}
      {subStep === 'L3_LISTEN' && (
        <div className="lesson-box">
          <div className="lesson-banner-card">
            <h2 className="lesson-heading">सुनें • Listen to Sun Sakhi</h2>
            <p className="lesson-subtext">सन सखी आपसे बात कर रही है</p>
          </div>
        </div>
      )}

      {/* LESSON 4 — TWO-WAY DEMO */}
      {(subStep === 'L4_DEMO_SPEAK' || subStep === 'L4_DEMO_LISTEN') && (
        <div className="lesson-box">
          <div className="lesson-banner-card">
            <h2 className="lesson-heading">अब आपकी बारी • Speak Now</h2>
            <p className="lesson-subtext">
              {isListening ? (userSpokenText ? `"${userSpokenText}"` : 'सन सखी सुन रही है...') : 'बटन दबाकर अपना नाम बताएं'}
            </p>
          </div>

          {subStep === 'L4_DEMO_LISTEN' && (
            <div className="circle-lesson-area">
              <div className="bouncing-hand-anim">👇</div>
              <button 
                className={`golden-mic-orb ${isListening ? 'orb-listening' : ''}`}
                onClick={handleL4MicTap}
                disabled={isSpeaking}
                aria-label="Speak to Sun Sakhi"
              >
                <div className="golden-halo-ring"></div>
                <div className="mic-icon-center">
                  <svg className="mic-svg" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#4A1E0B"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19v4M8 23h8" stroke="#4A1E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
