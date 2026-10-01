import React, { useState, useEffect } from 'react';
import Avatar from './components/Avatar';
import MicButton from './components/MicButton';
import ConfirmationDialog from './components/ConfirmationDialog';
import StatusBanner from './components/StatusBanner';
import LearnMode from './components/LearnMode';
import GuidedService from './components/GuidedService';
import SchemeSelector from './components/SchemeSelector';
import EligibilityChecker from './components/EligibilityChecker';
import { DEFAULT_WELCOME_PROMPT } from './config/languages';
import { GOVERNMENT_SCHEMES, DEFAULT_SCHEME } from './data/governmentServices';
import { detectLanguage } from './utils/languageDetector';
import { speechService } from './utils/speechService';
import { askGemini } from './services/geminiService';

export default function App() {
  /**
   * Application State Machine Steps:
   * 'WELCOME' -> 'TEACH_MIC' -> 'LISTENING' -> 'PROCESSING' -> 'DETECTING' -> 'CONFIRM_LANG' -> 'LEARN_MODE' -> 'MAIN_VOICE' -> 'SELECT_SCHEME' -> 'ELIGIBILITY_CHECK' -> 'GUIDED_MODE'
   */
  const [step, setStep] = useState('WELCOME');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedLang, setDetectedLang] = useState(null);
  const [savedLanguage, setSavedLanguage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [customResponseText, setCustomResponseText] = useState('');
  const [isConfused, setIsConfused] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(DEFAULT_SCHEME);

  // Real-Time Clock State for Status Bar
  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    hours = hours % 12 || 12;
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check saved language & learn mode completion on mount
  useEffect(() => {
    const existingLang = localStorage.getItem('sun_sakhi_language');
    const learnCompleted = localStorage.getItem('sun_sakhi_learn_completed');

    if (existingLang) {
      try {
        const parsedLang = JSON.parse(existingLang);
        setSavedLanguage(parsedLang);
        setDetectedLang(parsedLang);

        if (learnCompleted === 'true') {
          setStep('MAIN_VOICE');
        } else {
          setStep('LEARN_MODE');
        }
      } catch (e) {
        console.error('Failed to parse saved language:', e);
      }
    }
  }, []);

  // Step 1: Welcome Greeting Audio
  useEffect(() => {
    if (step === 'WELCOME') {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(
          DEFAULT_WELCOME_PROMPT.text,
          DEFAULT_WELCOME_PROMPT.lang,
          {
            onStart: () => setIsSpeaking(true),
            onEnd: () => {
              setIsSpeaking(false);
              setStep('TEACH_MIC');
            },
            onError: () => {
              setIsSpeaking(false);
              setStep('TEACH_MIC');
            }
          }
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle Main Mic Click
  const handleMicClick = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setErrorMessage('');
    setTranscript('');
    setIsConfused(false);

    setStep('LISTENING');
    setIsListening(true);

    const success = speechService.startListening({
      onStart: () => {
        setIsListening(true);
      },
      onResult: async ({ finalTranscript, interimTranscript }) => {
        const textToProcess = finalTranscript || interimTranscript;
        setTranscript(textToProcess);

        if (finalTranscript && finalTranscript.trim()) {
          speechService.stopListening();
          setIsListening(false);
          await handleSpeechInput(finalTranscript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        if (err === 'not-allowed' || err === 'permission_denied') {
          setStep('PERMISSION_DENIED');
          speakSupportiveMessage('I need permission to hear you.');
        } else if (err === 'no-speech') {
          setStep('NO_SPEECH');
          speakSupportiveMessage('I did not hear you. Take your time. Try again.');
        } else {
          setStep('ERROR');
          speakSupportiveMessage('That is okay. Let us try again.');
        }
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (!success) {
      setStep('ERROR');
      setErrorMessage('Browser speech recognition not available');
    }
  };

  // Speak Supportive Non-Shaming Error Messages
  const speakSupportiveMessage = (msg) => {
    const langCode = savedLanguage?.bcp47 || 'hi-IN';
    setIsSpeaking(true);
    speechService.speak(msg, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setStep(savedLanguage ? 'MAIN_VOICE' : 'TEACH_MIC');
      },
      onError: () => {
        setIsSpeaking(false);
        setStep(savedLanguage ? 'MAIN_VOICE' : 'TEACH_MIC');
      }
    });
  };

  // Route Speech Input (Language Detection VS Intent Processing)
  const handleSpeechInput = async (spokenText) => {
    // If language is not yet confirmed -> Detect Language
    if (!savedLanguage) {
      setStep('DETECTING');
      const result = await detectLanguage(spokenText);
      setDetectedLang(result.language);
      speakConfirmation(result.language);
      return;
    }

    // If language is confirmed -> Gemini Intent Processing
    setStep('PROCESSING');
    
    const geminiResult = await askGemini({
      userText: spokenText,
      language: savedLanguage,
      currentStep: step,
      serviceContext: { activeScheme: selectedScheme }
    });

    setCustomResponseText(geminiResult.responseText);

    // Check for confusion
    if (geminiResult.intent === 'CONFUSION' || geminiResult.needsHelp) {
      setIsConfused(true);
    }

    // Speak Gemini Response
    setIsSpeaking(true);
    setStep('SPEAKING');

    speechService.speak(
      geminiResult.responseText,
      savedLanguage.bcp47,
      {
        onStart: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          // Transition based on intent
          if (geminiResult.intent === 'CHECK_ELIGIBILITY') {
            setStep('ELIGIBILITY_CHECK');
          } else if (geminiResult.intent === 'SELECT_SCHEME') {
            setStep('SELECT_SCHEME');
          } else if (geminiResult.intent === 'START_SERVICE') {
            setStep('GUIDED_MODE');
          } else {
            setStep('MAIN_VOICE');
          }
        },
        onError: () => {
          setIsSpeaking(false);
          setStep('MAIN_VOICE');
        }
      }
    );
  };

  // Speak Language Confirmation
  const speakConfirmation = (lang) => {
    setStep('CONFIRM_LANG');
    setIsSpeaking(true);

    speechService.speak(
      lang.confirmPrompt,
      lang.bcp47,
      {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      }
    );
  };

  // User Confirms Language YES ✓
  const handleConfirmLanguage = () => {
    if (!detectedLang) return;

    speechService.stopSpeaking();
    setIsSpeaking(false);

    localStorage.setItem('sun_sakhi_language', JSON.stringify(detectedLang));
    setSavedLanguage(detectedLang);

    const learnCompleted = localStorage.getItem('sun_sakhi_learn_completed');
    if (learnCompleted === 'true') {
      setStep('MAIN_VOICE');
    } else {
      setStep('LEARN_MODE');
    }
  };

  // User Rejects Language NO ✕
  const handleRejectLanguage = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);

    const promptText = detectedLang?.tryAgainPrompt || 'कृपया दोबारा बोलें';
    const langCode = detectedLang?.bcp47 || 'hi-IN';

    setIsSpeaking(true);
    speechService.speak(
      promptText,
      langCode,
      {
        onStart: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          setStep('TEACH_MIC');
        },
        onError: () => {
          setIsSpeaking(false);
          setStep('TEACH_MIC');
        }
      }
    );
  };

  // Replay Audio
  const handleReplayAudio = () => {
    if (detectedLang) {
      speakConfirmation(detectedLang);
    }
  };

  // Learn Mode Completed
  const handleLearnCompleted = () => {
    localStorage.setItem('sun_sakhi_learn_completed', 'true');
    setStep('MAIN_VOICE');
  };

  // Select Scheme from Catalog
  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    setStep('ELIGIBILITY_CHECK');
  };

  // User Passes Eligibility Check
  const handleEligible = (scheme) => {
    setSelectedScheme(scheme);
    setStep('GUIDED_MODE');
  };

  // User Ineligible -> Return to catalog
  const handleIneligible = () => {
    setStep('SELECT_SCHEME');
  };

  // Reset Language & Learn Mode
  const handleReset = () => {
    speechService.stopSpeaking();
    localStorage.removeItem('sun_sakhi_language');
    localStorage.removeItem('sun_sakhi_learn_completed');
    setSavedLanguage(null);
    setDetectedLang(null);
    setTranscript('');
    setIsConfused(false);
    setSelectedScheme(DEFAULT_SCHEME);
    setStep('TEACH_MIC');
  };

  return (
    <div className="phone-mockup-frame">
      
      {/* Smartphone Status Bar */}
      <div className="mobile-status-bar">
        <span>{currentTime}</span>
        <div className="status-icons">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="app-viewport">
        
        {/* Render Digital Familiarization / Learn Mode */}
        {step === 'LEARN_MODE' ? (
          <LearnMode 
            selectedLanguage={savedLanguage || detectedLang}
            onComplete={handleLearnCompleted}
          />
        ) : step === 'SELECT_SCHEME' ? (
          /* Render Scheme Selection Catalog */
          <SchemeSelector 
            selectedLanguage={savedLanguage || detectedLang}
            onSelectScheme={handleSelectScheme}
          />
        ) : step === 'ELIGIBILITY_CHECK' ? (
          /* Render Eligibility Verification Flow */
          <EligibilityChecker 
            selectedScheme={selectedScheme}
            selectedLanguage={savedLanguage || detectedLang}
            onEligible={handleEligible}
            onIneligible={handleIneligible}
            onBack={() => setStep('SELECT_SCHEME')}
          />
        ) : step === 'GUIDED_MODE' ? (
          /* Render Guided Government Service Mode */
          <GuidedService 
            selectedLanguage={savedLanguage || detectedLang}
            onReset={() => setStep('MAIN_VOICE')}
            isConfused={isConfused}
            onClearConfusion={() => setIsConfused(false)}
          />
        ) : (
          <>
            {/* 1. Mascot Avatar */}
            <Avatar 
              isSpeaking={isSpeaking} 
              isListening={isListening} 
              isConfirmed={step === 'MAIN_VOICE'}
            />

            {/* 2. Status Banner */}
            <StatusBanner 
              step={step} 
              transcript={transcript} 
              errorMsg={errorMessage}
              customText={customResponseText}
            />

            {/* 3. Primary Action Area */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              {(step === 'WELCOME' || step === 'TEACH_MIC' || step === 'LISTENING' || step === 'PROCESSING' || step === 'SPEAKING' || step === 'MAIN_VOICE' || step === 'NO_SPEECH' || step === 'PERMISSION_DENIED' || step === 'ERROR') && (
                <MicButton 
                  onClick={handleMicClick}
                  isListening={isListening}
                  showTutorial={step === 'TEACH_MIC'}
                  disabled={isSpeaking || step === 'PROCESSING'}
                />
              )}

              {step === 'CONFIRM_LANG' && (
                <ConfirmationDialog 
                  detectedLang={detectedLang}
                  onConfirm={handleConfirmLanguage}
                  onReject={handleRejectLanguage}
                  onReplayAudio={handleReplayAudio}
                />
              )}

              {/* Main Voice Assistant Card */}
              {step === 'MAIN_VOICE' && savedLanguage && (
                <div className="main-voice-card">
                  <div className="service-quick-launch" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button className="btn-launch-service" onClick={() => setStep('SELECT_SCHEME')}>
                      <span className="launch-icon">📋</span>
                      <span className="launch-txt">योजनाएं एवं पात्रता जांचें • Check Schemes & Eligibility</span>
                    </button>

                    <button className="btn-launch-secondary" onClick={() => handleSelectScheme(GOVERNMENT_SCHEMES[0])}>
                      <span className="launch-icon">👶</span>
                      <span className="launch-txt">मातृ वंदना योजना (₹5,000)</span>
                    </button>
                  </div>

                  <div className="lang-footer-tag">
                    <span>🌐 {savedLanguage.nativeName} ({savedLanguage.name})</span>
                    <button className="btn-reset-link" onClick={handleReset}>
                      ↻ भाषा बदलें • Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      </div>

      {/* Bottom Gesture Bar */}
      <div className="gesture-bar"></div>
    </div>
  );
}
