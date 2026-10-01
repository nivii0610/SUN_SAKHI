/**
 * SUN SAKHI - Web Speech & Speech Synthesis Service
 * Wraps browser speech APIs with robust fallback handling for missing voices on low-end devices.
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.recognition = null;
    this.isListening = false;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    
    const load = () => {
      this.voices = this.synth.getVoices();
    };

    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  /**
   * Speak text with high reliability and fallback voice selection.
   * Gracefully handles cases where browser lacks native voices for regional Indian languages.
   * 
   * @param {string} text - Text to speak
   * @param {string} langCode - BCP-47 language tag (e.g. 'hi-IN', 'ta-IN')
   * @param {Object} options - Callbacks (onStart, onEnd, onError)
   */
  speak(text, langCode = 'hi-IN', options = {}) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      if (options.onEnd) options.onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9; // Slightly slower pace for maximum clarity for rural listeners
    utterance.pitch = 1.0;

    // Find best matching voice
    const availableVoices = this.synth.getVoices();
    if (availableVoices.length > 0) {
      const targetLangPrefix = langCode.substring(0, 2).toLowerCase();
      
      // 1. Exact BCP-47 match
      let matchedVoice = availableVoices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());

      // 2. Language prefix match (e.g. 'hi' for 'hi-IN')
      if (!matchedVoice) {
        matchedVoice = availableVoices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
      }

      // 3. Indian accent English voice fallback if specific regional voice missing
      if (!matchedVoice && targetLangPrefix !== 'en') {
        matchedVoice = availableVoices.find(v => v.lang.toLowerCase().includes('in'));
      }

      // 4. Default voice fallback
      if (!matchedVoice) {
        matchedVoice = availableVoices[0];
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (event) => {
      console.warn('SpeechSynthesis error:', event);
      if (options.onError) options.onError(event);
      if (options.onEnd) options.onEnd();
    };

    this.synth.speak(utterance);
  }

  /**
   * Stop speech synthesis immediately
   */
  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Initialize and start Speech Recognition
   * 
   * @param {Object} callbacks - { onResult, onError, onEnd, onStart }
   * @returns {boolean} Whether speech recognition could be started
   */
  startListening(callbacks = {}) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (callbacks.onError) {
        callbacks.onError('Web Speech API recognition not supported on this browser.');
      }
      return false;
    }

    try {
      if (this.recognition) {
        this.recognition.abort();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 3;

      // Note: Setting lang to empty or multi-lang fallback allows natural listening
      this.recognition.lang = ''; 

      this.recognition.onstart = () => {
        this.isListening = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (callbacks.onResult) {
          callbacks.onResult({
            finalTranscript,
            interimTranscript,
            rawEvent: event
          });
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech Recognition error:', event.error);
        if (callbacks.onError) callbacks.onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (callbacks.onEnd) callbacks.onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      if (callbacks.onError) callbacks.onError(err.message);
      return false;
    }
  }

  /**
   * Stop speech recognition listening
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
