import React from 'react';

/**
 * StatusBanner Component
 * Floating status card providing clear visual state without technical jargon.
 */
export default function StatusBanner({ step, transcript, errorMsg, customText }) {
  const getBannerDetails = () => {
    switch (step) {
      case 'WELCOME':
        return {
          title: 'नमस्ते! सन सखी में स्वागत है',
          subtext: 'कृपया बात करने के लिए बटन दबाएं'
        };
      case 'TEACH_MIC':
        return {
          title: 'बात करने के लिए माइक्रोफ़ोन दबाएं',
          subtext: 'निचे दिए गए बटन को दबाकर बात करें'
        };
      case 'LISTENING':
        return {
          title: 'सन सखी सुन रही है...',
          subtext: transcript ? `"${transcript}"` : 'कृपया अपनी भाषा में बोलें'
        };
      case 'PROCESSING':
        return {
          title: 'सन सखी सोच रही है...',
          subtext: 'कृपया एक पल प्रतीक्षा करें'
        };
      case 'SPEAKING':
        return {
          title: 'सन सखी बोल रही है...',
          subtext: customText || 'ध्यान से सुनें'
        };
      case 'DETECTING':
        return {
          title: 'भाषा पहचानी जा रही है...',
          subtext: 'कृपया एक पल प्रतीक्षा करें'
        };
      case 'CONFIRM_LANG':
        return {
          title: 'क्या यह आपकी भाषा है?',
          subtext: 'नीचे दिए गए बटन से पुष्टि करें'
        };
      case 'SAVED':
      case 'MAIN_VOICE':
        return {
          title: 'सन सखी से बात करें',
          subtext: customText || 'माइक्रोफ़ोन दबाकर अपनी ज़रूरत बताएं'
        };
      case 'SELECT_SCHEME':
        return {
          title: 'योजना चुनें • Select Scheme',
          subtext: 'नीचे दी गई योजना को छुएं'
        };
      case 'ELIGIBILITY_CHECK':
        return {
          title: 'पात्रता जांच • Check Eligibility',
          subtext: 'हाँ (✓) या नहीं (✕) का बटन छुएं'
        };
      case 'GUIDED_MODE':
        return {
          title: 'सरकारी सेवा मार्गदर्शन',
          subtext: customText || 'दिए गए निर्देश के अनुसार छुएं'
        };
      case 'CONFUSION':
        return {
          title: 'कोई बात नहीं, आइए फिर से देखें',
          subtext: 'निचे दिए गए चित्र को छुएं'
        };
      case 'PERMISSION_DENIED':
        return {
          title: 'माइक्रोफ़ोन की अनुमति चाहिए',
          subtext: 'सन सखी को आपकी आवाज़ सुनने की अनुमति दें'
        };
      case 'NO_SPEECH':
        return {
          title: 'आवाज़ साफ़ नहीं आई',
          subtext: 'कोई बात नहीं, आराम से फिर बोलें'
        };
      case 'ERROR':
        return {
          title: 'दोबारा कोशिश करें',
          subtext: errorMsg || 'आवाज़ साफ़ नहीं आई'
        };
      default:
        return {
          title: 'बात करने के लिए माइक्रोफ़ोन दबाएं',
          subtext: 'निचे दिए गए बटन को दबाकर बात करें'
        };
    }
  };

  const info = getBannerDetails();

  return (
    <div className="peach-status-card">
      <h2 className="peach-card-heading">{info.title}</h2>
      <p className="peach-card-subtext">{info.subtext}</p>
    </div>
  );
}
