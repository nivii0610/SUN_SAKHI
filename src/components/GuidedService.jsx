import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { GOVERNMENT_SCHEMES } from '../data/governmentServices';
import { speechService } from '../utils/speechService';

/**
 * GuidedService Component
 * Implements GUIDED MODE state machine for government services.
 * Principle: ONE ACTION PER SCREEN, NO READING REQUIRED.
 */
export default function GuidedService({ selectedScheme, selectedLanguage, onReset, isConfused, onClearConfusion }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeScheme = selectedScheme || GOVERNMENT_SCHEMES[0];
  const langCode = selectedLanguage?.code || 'hi-IN';
  const steps = activeScheme.steps || [];
  const currentStep = steps[currentStepIndex];

  // Get prompts in user's language or default fallback
  const getStepPrompts = (step) => {
    if (!step) return { voice: '', simpleVoice: '', confirmVoice: '' };
    return step.prompts[langCode] || step.prompts['hi-IN'] || step.prompts['en-IN'] || {
      voice: 'सामने दिख रहे चित्र को छुएं।',
      simpleVoice: 'चित्र को छुएं।',
      confirmVoice: 'शाबाश!'
    };
  };

  // Announce step spoken instruction on load or when step changes
  useEffect(() => {
    if (!isCompleted && currentStep) {
      const stepPrompts = getStepPrompts(currentStep);
      const textToSpeak = isConfused ? stepPrompts.simpleVoice : stepPrompts.voice;

      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speechService.speak(textToSpeak, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false)
        });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, isConfused, isCompleted, langCode]);

  // Handle User Action (Tapping the single primary target)
  const handleActionTap = () => {
    if (isSpeaking) speechService.stopSpeaking();
    if (onClearConfusion) onClearConfusion();

    setShowSparkle(true);
    setIsSpeaking(true);

    const stepPrompts = getStepPrompts(currentStep);

    speechService.speak(stepPrompts.confirmVoice, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        advanceStep();
      },
      onError: () => {
        setIsSpeaking(false);
        setShowSparkle(false);
        advanceStep();
      }
    });
  };

  const advanceStep = () => {
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="guided-service-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      
      {/* 1. Mascot Avatar */}
      <Avatar 
        isSpeaking={isSpeaking}
        isListening={false}
        isConfirmed={isCompleted}
      />

      {!isCompleted && currentStep ? (
        <>
          {/* Step Progress Pill */}
          <div className="step-progress-pill">
            <span>{activeScheme.icon}</span>
            <span>चरण {currentStep.stepNumber} / {currentStep.totalSteps}</span>
            <span>({currentStep.title})</span>
          </div>

          {/* Single Primary Visual Action Area */}
          <div className="guided-action-box">
            
            {/* Animated Pointing Hand */}
            <div className="bouncing-hand-anim">👇</div>

            {/* High Contrast Single Target Button */}
            <button 
              className={`guided-target-card ${showSparkle ? 'target-sparkle' : ''}`}
              onClick={handleActionTap}
              disabled={isSpeaking}
              aria-label={currentStep.actionLabel}
            >
              <div className="target-halo-ring"></div>
              
              <div className="target-icon-display">
                <span className="huge-action-emoji">{currentStep.icon}</span>
              </div>

              <div className="target-action-banner">
                {currentStep.actionLabel}
              </div>

              {showSparkle && <span className="sparkle-stars">✨ 🌟 ✨</span>}
            </button>
          </div>

          {/* Visual Guidance Status */}
          <div className="visual-guidance-card">
            {isConfused ? (
              <p className="guidance-text-warning">
                💡 ध्यान से देखें: नीचे दिए चित्र पर छुएं
              </p>
            ) : (
              <p className="guidance-text-normal">
                चित्र को छुएं • Touch the picture above
              </p>
            )}
          </div>
        </>
      ) : (
        /* Completion Celebration Card */
        <div className="completion-card-warm">
          <div className="completion-emoji">🎉 🏆 🎉</div>
          <h2 className="completion-title">आवेदन सफलतापूर्वक पूरा हुआ!</h2>
          <p className="completion-subtitle">
            {activeScheme.name} का आवेदन पूरा हो गया है।
          </p>
          <div className="completion-badge">
            {activeScheme.benefitText} Connected
          </div>
          
          <button className="btn-reset-guided" onClick={onReset}>
            ↻ दूसरी योजना देखें • View Other Schemes
          </button>
        </div>
      )}

    </div>
  );
}
