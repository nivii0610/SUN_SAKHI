/**
 * SUN SAKHI - Decoupled Language Detection Utility
 * 
 * IMPORTANT ARCHITECTURE NOTE:
 * This module is purposefully isolated so that browser-side transcript analysis
 * can easily be upgraded or swapped with an AI model (e.g. Gemini 2.5/3 API)
 * or audio-level language identification service in future hackathon milestones.
 */

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages';

/**
 * Detects the target language from spoken transcript text and speech recognition metadata.
 * 
 * @param {string} text - The transcript output from Web Speech API
 * @param {Object} [speechMetadata] - Optional metadata (e.g., speech recognition event data)
 * @returns {Promise<{
 *   language: Object,
 *   confidence: number, // 0 to 1
 *   rawTranscript: string,
 *   detectedMethod: string
 * }>}
 */
export async function detectLanguage(text, speechMetadata = {}) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      language: DEFAULT_LANGUAGE,
      confidence: 0.1,
      rawTranscript: text || '',
      detectedMethod: 'fallback'
    };
  }

  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  // 1. Script Range Identification
  let scriptMatchedLangs = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang.scriptRegex && lang.scriptRegex.test(cleanText)) {
      scriptMatchedLangs.push(lang);
    }
  }

  // 2. Disambiguation for Devanagari (Hindi vs Marathi)
  if (scriptMatchedLangs.some(l => l.code === 'hi-IN') && scriptMatchedLangs.some(l => l.code === 'mr-IN')) {
    const marathiMarkers = ['आहे', 'नाही', 'माझे', 'हो', 'तुम्ही', 'नमस्कार', 'मराठी', 'बोला'];
    const hindiMarkers = ['है', 'नहीं', 'मेरा', 'हाँ', 'आप', 'नमस्ते', 'हिंदी', 'बोल'];

    let mrScore = 0;
    let hiScore = 0;

    marathiMarkers.forEach(word => {
      if (cleanText.includes(word)) mrScore += 2;
    });

    hindiMarkers.forEach(word => {
      if (cleanText.includes(word)) hiScore += 2;
    });

    if (mrScore > hiScore) {
      const mrLang = SUPPORTED_LANGUAGES.find(l => l.code === 'mr-IN');
      return {
        language: mrLang,
        confidence: 0.85,
        rawTranscript: cleanText,
        detectedMethod: 'script_and_vocabulary_marathi'
      };
    } else {
      const hiLang = SUPPORTED_LANGUAGES.find(l => l.code === 'hi-IN');
      return {
        language: hiLang,
        confidence: 0.85,
        rawTranscript: cleanText,
        detectedMethod: 'script_and_vocabulary_hindi'
      };
    }
  }

  // 3. Direct script match for distinct Indian scripts (Tamil, Telugu, Kannada, Bengali)
  const distinctScriptLang = scriptMatchedLangs.find(l => 
    ['ta-IN', 'te-IN', 'kn-IN', 'bn-IN'].includes(l.code)
  );

  if (distinctScriptLang) {
    return {
      language: distinctScriptLang,
      confidence: 0.9,
      rawTranscript: cleanText,
      detectedMethod: 'native_script_range'
    };
  }

  // 4. Sample word match across all supported languages (including Romanized / Transliterated text)
  let bestMatch = null;
  let highestScore = 0;

  for (const lang of SUPPORTED_LANGUAGES) {
    let score = 0;
    for (const sample of lang.sampleWords) {
      if (lowerText.includes(sample.toLowerCase())) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = lang;
    }
  }

  if (bestMatch && highestScore > 0) {
    return {
      language: bestMatch,
      confidence: Math.min(0.6 + highestScore * 0.1, 0.95),
      rawTranscript: cleanText,
      detectedMethod: 'keyword_matching'
    };
  }

  // 5. Check if metadata provided language hint
  if (speechMetadata.lang) {
    const metaLang = SUPPORTED_LANGUAGES.find(l => 
      l.code.toLowerCase().startsWith(speechMetadata.lang.toLowerCase().substring(0, 2))
    );
    if (metaLang) {
      return {
        language: metaLang,
        confidence: 0.7,
        rawTranscript: cleanText,
        detectedMethod: 'speech_recognition_metadata'
      };
    }
  }

  // 6. English Script Fallback
  if (/[a-zA-Z]/.test(cleanText)) {
    const enLang = SUPPORTED_LANGUAGES.find(l => l.code === 'en-IN');
    return {
      language: enLang,
      confidence: 0.75,
      rawTranscript: cleanText,
      detectedMethod: 'latin_script_match'
    };
  }

  // Fallback default
  return {
    language: DEFAULT_LANGUAGE,
    confidence: 0.4,
    rawTranscript: cleanText,
    detectedMethod: 'default_fallback'
  };
}
