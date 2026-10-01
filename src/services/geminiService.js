/**
 * SUN SAKHI - Gemini AI Service Client Layer
 * Handles communication with the secure backend proxy endpoint (/api/gemini).
 */

export async function askGemini({ userText, language, currentStep, serviceContext }) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userText,
        language,
        currentStep,
        serviceContext
      })
    });

    if (!response.ok) {
      console.warn('Gemini proxy returned non-200 status:', response.status);
      return getLocalFallback(userText, language);
    }

    const data = await response.json();
    return {
      responseText: data.responseText || "बहुत बढ़िया! चलिए आगे बढ़ते हैं।",
      intent: data.intent || "GENERAL_QUERY",
      needsHelp: Boolean(data.needsHelp),
      continueStep: true
    };
  } catch (err) {
    console.warn('Backend proxy fetch failed, utilizing client-side fallback:', err);
    return getLocalFallback(userText, language);
  }
}

/**
 * Intelligent Client-Side Fallback for offline or network error cases.
 */
function getLocalFallback(userText = '', language = {}) {
  const text = userText.toLowerCase();

  // Confusion triggers
  if (
    text.includes('नहीं समझ') || 
    text.includes('मदद') || 
    text.includes('help') || 
    text.includes('dont') || 
    text.includes('don\'t') ||
    text.includes('புரியவில்லை') ||
    text.includes('అర్థం కాలేదు') ||
    text.includes('ತಿಳಿಯಲಿಲ್ಲ')
  ) {
    return {
      responseText: language?.learnMode?.l1Instruction || "कोई बात नहीं। सामने दिख रहे चित्र को छुएं।",
      intent: "CONFUSION",
      needsHelp: true,
      continueStep: true
    };
  }

  // Eligibility Check triggers
  if (
    text.includes('पात्र') || 
    text.includes('योग्य') || 
    text.includes('मिलेगा') || 
    text.includes('eligible') || 
    text.includes('check') || 
    text.includes('गैस') || 
    text.includes('सिलेंडर') || 
    text.includes('खाता')
  ) {
    return {
      responseText: "आइए आपकी पात्रता की जांच करते हैं। नीचे प्रश्नों का उत्तर दें।",
      intent: "CHECK_ELIGIBILITY",
      needsHelp: false,
      continueStep: true
    };
  }

  // Scheme/Government Service trigger
  if (
    text.includes('योजना') || 
    text.includes('सरकारी') || 
    text.includes('पैसे') || 
    text.includes('मातृ') || 
    text.includes('scheme') ||
    text.includes('government') ||
    text.includes('matru')
  ) {
    return {
      responseText: "मैं आपकी सहायता करूँगी। अपनी योजना चुनें या पात्रता जांचें।",
      intent: "SELECT_SCHEME",
      needsHelp: false,
      continueStep: true
    };
  }

  return {
    responseText: "मैंने आपकी बात सुन ली है। चलिए आगे बढ़ते हैं।",
    intent: "GENERAL_QUERY",
    needsHelp: false,
    continueStep: true
  };
}
