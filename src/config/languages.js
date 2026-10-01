/**
 * SUN SAKHI - Language Configuration Dictionary
 * Includes Learn Mode spoken prompts for all 7 supported regional languages.
 */

export const SUPPORTED_LANGUAGES = [
  {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '☀️',
    bcp47: 'hi-IN',
    scriptRegex: /[\u0900-\u097F]/,
    sampleWords: ['नमस्ते', 'हाँ', 'नहीं', 'सुन', 'सखी', 'बात', 'मेरा', 'नाम', 'अच्छा', 'हिंदी'],
    confirmPrompt: 'आप हिन्दी में बोल रहे हैं। क्या यह सही है?',
    welcomeGreeting: 'नमस्ते! मैं सन सखी हूँ। कृपया मुझसे बात करें।',
    savedMessage: 'बहुत बढ़िया! सन सखी आपकी भाषा समझ गई है।',
    tryAgainPrompt: 'कोई बात नहीं, कृपया दोबारा बोलें।',
    learnMode: {
      l1Instruction: 'बड़े गोले को छुएं।',
      l1Success: 'बहुत बढ़िया! आपने कर दिखाया।',
      l2Instruction: 'माइक्रोफ़ोन को छुएं।',
      l2Success: 'शाबाश! अब आप मुझसे बात कर सकती हैं।',
      l3Message: 'नमस्ते। मैं आपसे बात कर सकती हूँ और आपकी मदद कर सकती हूँ।',
      l3Explanation: 'अब आप समझ गईं कि मैं आपसे बात कर सकती हूँ।',
      demoQuestion: 'आपका नाम क्या है? कृपया बोलें।',
      demoResponse: 'बहुत सुंदर! मैंने आपकी आवाज़ सुन ली है।'
    }
  },
  {
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '☀️',
    bcp47: 'ta-IN',
    scriptRegex: /[\u0B80-\u0BFF]/,
    sampleWords: ['வணக்கம்', 'ஆமாம்', 'இல்லை', 'சன்', 'சகி', 'பேசு', 'என்', 'பெயர்', 'தமிழ்'],
    confirmPrompt: 'நீங்கள் தமிழில் பேசுகிறீர்கள். இது சரியா?',
    welcomeGreeting: 'வணக்கம்! நான் சன் சகி. என்னிடம் பேசுங்கள்.',
    savedMessage: 'மிக நன்று! சன் சகி உங்கள் மொழியைப் புரிந்துகொண்டது.',
    tryAgainPrompt: 'பரவாயில்லை, தயவுசெய்து மீண்டும் பேசுங்கள்.',
    learnMode: {
      l1Instruction: 'பெரிய வட்டத்தைத் தொடுங்கள்.',
      l1Success: 'மிக நன்று! நீங்கள் செய்துவிட்டீர்கள்.',
      l2Instruction: 'மைக்ரோஃபோனைத் தொடுங்கள்.',
      l2Success: 'நன்று! இப்போது நீங்கள் என்னிடம் பேசலாம்.',
      l3Message: 'வணக்கம். என்னால் உங்களிடம் பேசவும் உதவவும் முடியும்.',
      l3Explanation: 'இப்போது என்னால் உங்களிடம் பேச முடியும் என்பதை நீங்கள் அறிந்துகொண்டீர்கள்.',
      demoQuestion: 'உங்கள் பெயர் என்ன? தயவுசெய்து சொல்லுங்கள்.',
      demoResponse: 'அற்புதம்! நான் உங்களைக் கேட்டுக்கொண்டேன்.'
    }
  },
  {
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '☀️',
    bcp47: 'te-IN',
    scriptRegex: /[\u0C00-\u0C7F]/,
    sampleWords: ['నమస్కారం', 'అవును', 'కాదు', 'సన్', 'సఖి', 'మాట్లాడు', 'నా', 'పేరు', 'తెలుగు'],
    confirmPrompt: 'మీరు తెలుగులో మాట్లాడుతున్నారు. ఇది సరియేనా?',
    welcomeGreeting: 'నమస్కారం! నేను సన్ సఖి. నాతో మాట్లాడండి.',
    savedMessage: 'చాలా మంచిది! సన్ సఖి మీ భాషను అర్థం చేసుకుంది.',
    tryAgainPrompt: 'పర్వాలేదు, దయచేసి మళ్లీ మాట్లాడండి.',
    learnMode: {
      l1Instruction: 'పెద్ద వృత్తాన్ని తాకండి.',
      l1Success: 'చాలా మంచిది! మీరు చేసారు.',
      l2Instruction: 'మైక్రోఫోన్‌ను తాకండి.',
      l2Success: 'మంచిది! ఇప్పుడు మీరు నాతో మాట్లాడవచ్చు.',
      l3Message: 'నమస్కారం. నేను మీతో మాట్లాడగలను మరియు సహాయం చేయగలను.',
      l3Explanation: 'ఇప్పుడు నేను మీతో మాట్లాడగలనని మీకు తెలిసింది.',
      demoQuestion: 'మీ పేరేమిటి? దయచేసి చెప్పండి.',
      demoResponse: 'చాలా బాగుంది! నేను విన్నాను.'
    }
  },
  {
    code: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '☀️',
    bcp47: 'kn-IN',
    scriptRegex: /[\u0C80-\u0CFF]/,
    sampleWords: ['నమస్కార', 'నమస్తే', 'ಹೌದು', 'ಇಲ್ಲ', 'ಸನ್', 'ಸಖಿ', 'ಮಾತನಾಡಿ', 'ನನ್ನ', 'ಹೆಸರು', 'ಕನ್ನಡ'],
    confirmPrompt: 'ನೀವು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತಿದ್ದೀರಿ. ಇದು ಸರಿಯೇ?',
    welcomeGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಸನ್ ಸಖಿ. ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಿ.',
    savedMessage: 'ತುಂಬಾ ভাল! ಸನ್ ಸಖಿ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದೆ.',
    tryAgainPrompt: 'ಪರವಾಗಿಲ್ಲ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಮಾತನಾಡಿ.',
    learnMode: {
      l1Instruction: 'ದೊಡ್ಡ ವೃತ್ತವನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
      l1Success: 'ತುಂಬಾ ಒಳ್ಳೆಯದು! ನೀವು ಅದನ್ನು ಮಾಡಿದ್ದೀರಿ.',
      l2Instruction: 'ಮೈಕ್ರೊಫೋನ್ ಅನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
      l2Success: 'ಉತ್ತಮ! ಈಗ ನೀವು ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಬಹುದು.',
      l3Message: 'ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಬಲ್ಲೆ ಮತ್ತು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.',
      l3Explanation: 'ಈಗ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಬಲ್ಲೆ ಎಂದು ನಿಮಗೆ ತಿಳಿದಿದೆ.',
      demoQuestion: 'ನಿಮ್ಮ ಹೆಸರೇನು? ದಯವಿಟ್ಟು ಹೇಳಿ.',
      demoResponse: 'ಅದ್ಭುತ! ನಾನು ಕೇಳಿದೆ.'
    }
  },
  {
    code: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '☀️',
    bcp47: 'bn-IN',
    scriptRegex: /[\u0980-\u09FF]/,
    sampleWords: ['নমস্কার', 'হ্যাঁ', 'না', 'সান', 'সখী', 'কথা', 'আমার', 'নাম', 'বাংলা'],
    confirmPrompt: 'আপনি বাংলায় কথা বলছেন। এটি কি সঠিক?',
    welcomeGreeting: 'নমস্কার! আমি সান সখী। দয়া করে আমার সাথে কথা বলুন।',
    savedMessage: 'খুব ভালো! সান সখী আপনার ভাষা বুঝতে পেরেছে।',
    tryAgainPrompt: 'কোন অসুবিধা নেই, দয়া করে আবার বলুন।',
    learnMode: {
      l1Instruction: 'বড় বৃত্তটি স্পর্শ করুন।',
      l1Success: 'খুব ভালো! আপনি পেরেছেন।',
      l2Instruction: 'মাইক্রোফোনটি স্পর্শ করুন।',
      l2Success: 'চমৎকার! এখন আপনি আমার সাথে কথা বলতে পারেন।',
      l3Message: 'নমস্কার। আমি আপনার সাথে কথা বলতে পারি এবং সাহায্য করতে পারি।',
      l3Explanation: 'এখন আপনি বুঝতে পারলেন যে আমি আপনার সাথে কথা বলতে পারি।',
      demoQuestion: 'আপনার নাম কি? দয়া করে বলুন।',
      demoResponse: 'খুব সুন্দর! আমি শুনতে পেয়েছি।'
    }
  },
  {
    code: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '☀️',
    bcp47: 'mr-IN',
    scriptRegex: /[\u0900-\u097F]/,
    sampleWords: ['नमस्कार', 'हो', 'नाही', 'सन', 'सखी', 'बोला', 'माझे', 'नाव', 'मराठी', 'आहे'],
    confirmPrompt: 'तुम्ही मराठीत बोलत आहात. हे बरोबर आहे का?',
    welcomeGreeting: 'नमस्कार! मी सन सखी आहे. कृपया माझ्याशी बोला.',
    savedMessage: 'छान! सन सखीला तुमची भाषा समजली आहे.',
    tryAgainPrompt: 'काही हरकत नाही, कृपया पुन्हा बोला।',
    learnMode: {
      l1Instruction: 'मोठ्या वर्तुळाला स्पर्श करा.',
      l1Success: 'खूप छान! तुम्ही केले.',
      l2Instruction: 'मायक्रोफोनला स्पर्श करा.',
      l2Success: 'छान! आता तुम्ही माझ्याशी बोलू शकता.',
      l3Message: 'नमस्कार. मी तुमच्याशी बोलू शकते आणि मदत करू शकते.',
      l3Explanation: 'आता तुम्हाला समजले की मी तुमच्याशी बोलू शकते.',
      demoQuestion: 'तुमचे नाव काय आहे? कृपया सांगा.',
      demoResponse: 'खूप छान! मी ऐकले.'
    }
  },
  {
    code: 'en-IN',
    name: 'English',
    nativeName: 'English',
    flag: '☀️',
    bcp47: 'en-IN',
    scriptRegex: /[a-zA-Z]/,
    sampleWords: ['hello', 'hi', 'sun', 'sakhi', 'speak', 'my', 'name', 'is', 'yes', 'no', 'english'],
    confirmPrompt: 'You are speaking in English. Is this correct?',
    welcomeGreeting: 'Namaste! I am Sun Sakhi. Please speak to me.',
    savedMessage: 'Wonderful! Sun Sakhi has saved your language.',
    tryAgainPrompt: 'No problem, please speak again.',
    learnMode: {
      l1Instruction: 'Touch the big circle.',
      l1Success: 'Very good. You did it.',
      l2Instruction: 'Touch the microphone.',
      l2Success: 'Good. Now you can talk to me.',
      l3Message: 'Hello. I can talk to you and help you.',
      l3Explanation: 'Now you know that I can speak to you.',
      demoQuestion: 'What is your name? Please speak.',
      demoResponse: 'Wonderful! I heard you.'
    }
  }
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

export const DEFAULT_WELCOME_PROMPT = {
  text: "Namaste! I am Sun Sakhi. Please speak to me.",
  lang: "hi-IN"
};
