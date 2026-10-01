/**
 * SUN SAKHI - Controlled Government Schemes & Eligibility Repository
 * 
 * CRITICAL SAFETY REQUIREMENT:
 * Gemini must NEVER invent government scheme eligibility or benefit amounts.
 * All official scheme data and eligibility parameters come from this controlled file.
 */

export const GOVERNMENT_SCHEMES = [
  {
    id: 'PM_MATRU_VANDANA',
    name: 'प्रधानमंत्री मातृ वंदना योजना',
    nameEnglish: 'PM Matru Vandana Yojana',
    category: 'गर्भवती एवं धात्री महिला',
    icon: '👶',
    benefitText: '₹5,000 वित्तीय सहायता',
    benefitTextEnglish: '₹5,000 Financial Assistance',
    prompts: {
      'hi-IN': 'गर्भवती महिलाओं को ₹5,000 की सहायता मिलती है।',
      'ta-IN': 'கர்ப்பிணி பெண்களுக்கு ₹5,000 உதவித்தொகை வழங்கப்படுகிறது.',
      'te-IN': 'గర్భిణీ స్త్రీలకు ₹5,000 సహాయం లభిస్తుంది.',
      'kn-IN': 'ಗರ್ಭಿಣಿಯರಿಗೆ ₹5,000 ನೆರವು ಸಿಗುತ್ತದೆ.',
      'bn-IN': 'গর্ভবতী মহিলাদের জন্য ₹৫,০০০ সহায়তা।',
      'mr-IN': 'गरोदर महिलांना ₹5,000 ची मदत मिळते.',
      'en-IN': 'Pregnant women receive ₹5,000 financial support.'
    },
    eligibilityQuestions: [
      {
        id: 'Q_PREGNANT_FIRST',
        text: {
          'hi-IN': 'क्या यह आपका पहला या दूसरा बच्चा है?',
          'ta-IN': 'இது உங்கள் முதல் அல்லது இரண்டாவது குழந்தையா?',
          'te-IN': 'ఇది మీ మొదటి లేదా రెండవ బిడ్డనా?',
          'kn-IN': 'ಇದು ನಿಮ್ಮ ಮೊದಲ ಅಥವಾ ಎರಡನೇ ಮಗುವೇ?',
          'bn-IN': 'এটি কি আপনার প্রথম বা দ্বিতীয় সন্তান?',
          'mr-IN': 'हे तुमचे पहिले किंवा दुसरे मूल आहे का?',
          'en-IN': 'Is this your first or second child?'
        },
        icon: '👶'
      },
      {
        id: 'Q_AGE_19',
        text: {
          'hi-IN': 'क्या आपकी उम्र 19 वर्ष या उससे अधिक है?',
          'ta-IN': 'உங்கள் வயது 19 அல்லது அதற்கு மேற்பட்டதா?',
          'te-IN': 'మీ వయస్సు 19 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ ఉందా?',
          'kn-IN': 'ನಿಮ್ಮ ವಯಸ್ಸು 19 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿದೆಯೇ?',
          'bn-IN': 'আপনার বয়স কি ১৯ বছর বা তার বেশি?',
          'mr-IN': 'तुमचे वय 19 वर्षे किंवा त्याहून अधिक आहे का?',
          'en-IN': 'Are you 19 years of age or older?'
        },
        icon: '🎂'
      },
      {
        id: 'Q_BANK_ACCOUNT',
        text: {
          'hi-IN': 'क्या आपके पास आधार से जुड़ा बैंक खाता है?',
          'ta-IN': 'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு உள்ளதா?',
          'te-IN': 'మీ వద్ద ఆధారప్‌తో అనుసంధానించబడిన బ్యాంక్ ఖాతా ఉందా?',
          'kn-IN': 'ನಿಮ್ಮ ಬಳಿ ಆಧಾರ್ ಜೋಡಿಸಲಾದ ಬ್ಯಾಂಕ್ ಖಾತೆ ಇದೆಯೇ?',
          'bn-IN': 'আপনার কি আধারের সাথে যুক্ত ব্যাংক অ্যাকাউন্ট আছে?',
          'mr-IN': 'तुमच्याकडे आधाराशी जोडलेले बँक खाते आहे का?',
          'en-IN': 'Do you have an Aadhaar-linked bank account?'
        },
        icon: '🏦'
      }
    ],
    steps: [
      {
        id: 'STEP_AADHAAR',
        stepNumber: 1,
        totalSteps: 3,
        title: 'आधार कार्ड सत्यापन',
        icon: '🪪',
        actionLabel: 'आधार कार्ड छुएं • Touch Aadhaar Card',
        prompts: {
          'hi-IN': {
            voice: 'पहला कदम: अपने आधार कार्ड वाले फोटो को छुएं।',
            simpleVoice: 'कोई बात नहीं। सामने दिख रहे कार्ड वाले चित्र को छुएं।',
            confirmVoice: 'शाबाश! आपका आधार कार्ड सत्यापित हो गया है।'
          },
          'ta-IN': {
            voice: 'முதல் படி: உங்கள் ஆதார் கார்டு படத்தைத் தொடுங்கள்.',
            simpleVoice: 'பரவாயில்லை. திரையில் உள்ள அட்டையைத் தொடுங்கள்.',
            confirmVoice: 'மிக நன்று! உங்கள் ஆதார் சரிபார்க்கப்பட்டது.'
          },
          'te-IN': {
            voice: 'మొదటి సారి: మీ ఆధార్ కార్డ్ బొమ్మను తాకండి.',
            simpleVoice: 'పర్వాలేదు. తెరపై ఉన్న కార్డ్‌ను తాకండి.',
            confirmVoice: 'చాలా మంచిది! మీ ఆధార్ ధృవీకరించబడింది.'
          },
          'kn-IN': {
            voice: 'ಮೊದಲ ಹಂತ: ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಚಿತ್ರವನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
            simpleVoice: 'ಪರವಾಗಿಲ್ಲ. ಪರದೆಯ ಮೇಲಿನ ಕಾರ್ಡ್ ಸ್ಪರ್ಶಿಸಿ.',
            confirmVoice: 'ಉತ್ತಮ! ನಿಮ್ಮ ಆಧಾರ್ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.'
          },
          'bn-IN': {
            voice: 'প্রথম ধাপ: আপনার আধার কার্ডের ছবিটি স্পর্শ করুন।',
            simpleVoice: 'কোন অসুবিধা নেই। স্ক্রিনের কার্ডটিতে চাপ দিন।',
            confirmVoice: 'খুব ভালো! আপনার আধার কার্ড যাচাই করা হয়েছে।'
          },
          'mr-IN': {
            voice: 'पहिली पायरी: तुमच्या आधार कार्डाच्या चित्राला स्पर्श करा.',
            simpleVoice: 'काही हरकत नाही. समोरील कार्डाला स्पर्श करा.',
            confirmVoice: 'छान! तुमचे आधार कार्ड सत्यापित झाले आहे.'
          },
          'en-IN': {
            voice: 'First step: Touch the Aadhaar card picture.',
            simpleVoice: 'No problem. Touch the card image on the screen.',
            confirmVoice: 'Very good! Your Aadhaar card is verified.'
          }
        }
      },
      {
        id: 'STEP_BANK',
        stepNumber: 2,
        totalSteps: 3,
        title: 'बैंक खाता जोड़ें',
        icon: '🏦',
        actionLabel: 'बैंक खाते को छुएं • Touch Bank Account',
        prompts: {
          'hi-IN': {
            voice: 'दूसरा कदम: सीधे पैसे पाने के लिए बैंक वाले चित्र को छुएं।',
            simpleVoice: 'आराम से। बैंक वाले बड़े निशान को छुएं।',
            confirmVoice: 'बहुत बढ़िया! आपका बैंक खाता जुड़ गया है।'
          },
          'ta-IN': {
            voice: 'இரண்டாவது படி: பணத்தைப் பெற வங்கி படத்தைத் தொடுங்கள்.',
            simpleVoice: 'மெதுவாக. பெரிய வங்கி குறியீட்டைத் தொடுங்கள்.',
            confirmVoice: 'அற்புதம்! உங்கள் வங்கி கணக்கு இணைக்கப்பட்டது.'
          },
          'te-IN': {
            voice: 'రెండవ సారి: డబ్బులు పొందడానికి బ్యాంకు బొమ్మను తాకండి.',
            simpleVoice: 'నెమ్మదిగా. బ్యాంకు గుర్తును తాకండి.',
            confirmVoice: 'చాలా బాగుంది! మీ బ్యాంక్ ఖాతా అనుసంధానించబడింది.'
          },
          'kn-IN': {
            voice: 'ಎರಡನೇ ಹಂತ: ಹಣ ಪಡೆಯಲು ಬ್ಯಾಂಕ್ ಚಿತ್ರವನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
            simpleVoice: 'ನಿಧಾನವಾಗಿ. ಬ್ಯಾಂಕ್ ಚಿಹ್ನೆಯನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
            confirmVoice: 'ಅದ್ಭುತ! ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ.'
          },
          'bn-IN': {
            voice: 'দ্বিতীয় ধাপ: টাকা পেতে ব্যাংকের ছবিটি স্পর্শ করুন।',
            simpleVoice: 'ধীরে সুস্থে। ব্যাংকের বড় চিহ্নটিতে চাপ দিন।',
            confirmVoice: 'চমৎকার! আপনার ব্যাংক অ্যাকাউন্ট যুক্ত হয়েছে।'
          },
          'mr-IN': {
            voice: 'दुसरी पायरी: पैसे मिळवण्यासाठी बँक चित्राला स्पर्श करा.',
            simpleVoice: 'हळूहळू. बँकेच्या चिन्हाला स्पर्श करा.',
            confirmVoice: 'उत्तम! तुमचे बँक खाते जोडले गेले आहे.'
          },
          'en-IN': {
            voice: 'Second step: Touch the bank icon to receive payment.',
            simpleVoice: 'Take your time. Touch the bank icon on screen.',
            confirmVoice: 'Wonderful! Your bank account is linked.'
          }
        }
      },
      {
        id: 'STEP_DOCTOR',
        stepNumber: 3,
        totalSteps: 3,
        title: 'डॉक्टर पर्चा सत्यापन',
        icon: '🏥',
        actionLabel: 'अस्पताल मोहर को छुएं • Touch Doctor Stamp',
        prompts: {
          'hi-IN': {
            voice: 'अंतिम कदम: अस्पताल की मोहर वाले चित्र को छुएं।',
            simpleVoice: 'बस एक कदम और। हरे रंग की मोहर को छुएं।',
            confirmVoice: 'बधाई हो! आपकी मातृ वंदना योजना का आवेदन पूरा हो गया है।'
          },
          'ta-IN': {
            voice: 'கடைசி படி: மருத்துவமனை முத்திரை படத்தைத் தொடுங்கள்.',
            simpleVoice: 'இன்னும் ஒரு படி. பச்சை முத்திரையைத் தொடுங்கள்.',
            confirmVoice: 'வாழ்த்துக்கள்! உங்கள் விண்ணப்பம் முடிவடைந்தது.'
          },
          'te-IN': {
            voice: 'చివరి సారి: ఆసుపత్రి ముద్ర బొమ్మను తాకండి.',
            simpleVoice: 'ఇంకొక్క అడుగు. పచ్చటి ముద్రను తాకండి.',
            confirmVoice: 'అభినందనలు! మీ అప్లికేషన్ పూర్తయింది.'
          },
          'kn-IN': {
            voice: 'ಕೊನೆಯ ಹಂತ: ಆಸ್ಪತ್ರೆಯ ಮುದ್ರೆ ಚಿತ್ರವನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
            simpleVoice: 'ಇನ್ನೊಂದು ಹಂತ. ಹಸಿರು ಮುದ್ರೆಯನ್ನು ಸ್ಪರ್ಶಿಸಿ.',
            confirmVoice: 'ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಅರ್ಜಿ ಪೂರ್ಣಗೊಂಡಿದೆ.'
          },
          'bn-IN': {
            voice: 'শেষ ধাপ: হাসপাতালের সিলমোহরের ছবিটি স্পর্শ করুন।',
            simpleVoice: 'আর একটি ধাপ। সবুজ সিলমোহরটিতে চাপ দিন।',
            confirmVoice: 'অভিনন্দন! আপনার আবেদন সফলভাবে সম্পন্ন হয়েছে।'
          },
          'mr-IN': {
            voice: 'शेवटची पायरी: हॉस्पिटलच्या शिक्क्याला स्पर्श करा.',
            simpleVoice: 'आणखी एक पायरी. हिरव्या शिक्क्याला स्पर्श करा.',
            confirmVoice: 'अभिनंदन! तुमचा अर्ज पूर्ण झाला आहे.'
          },
          'en-IN': {
            voice: 'Final step: Touch the hospital stamp picture.',
            simpleVoice: 'One last step. Touch the green stamp image.',
            confirmVoice: 'Congratulations! Your application is complete.'
          }
        }
      }
    ]
  },
  {
    id: 'PM_UJJWALA',
    name: 'प्रधानमंत्री उज्ज्वला योजना',
    nameEnglish: 'PM Ujjwala Gas Yojana',
    category: 'मुफ्त रसोई गैस कनेक्शन',
    icon: '⛽',
    benefitText: 'मुफ्त गैस कनेक्शन + सिलेंडर',
    benefitTextEnglish: 'Free LPG Gas Connection & Cylinder',
    prompts: {
      'hi-IN': 'मुफ्त एलपीजी गैस कनेक्शन और पहला सिलेंडर मुफ्त मिलता है।',
      'ta-IN': 'இலவச எல்பிஜி கேஸ் இணைப்பு மற்றும் முதல் சிலிண்டர் இலவசம்.',
      'te-IN': 'ఉచిత ఎల్పిజి గ్యాస్ కనెక్షన్ మరియు మొదటి సిలిండర్ ఉచితం.',
      'kn-IN': 'ಉಚಿತ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಮತ್ತು ಮೊದಲ ಸಿಲಿಂಡರ್ ಉಚಿತ.',
      'bn-IN': 'বিনামূল্যে এলপিজি গ্যাস সংযোগ এবং প্রথম সিলিন্ডার বিনামূল্যে।',
      'mr-IN': 'मोफत एलपीजी गॅस कनेक्शन आणि पहिला सिलेंडर मोफत मिळतो.',
      'en-IN': 'Free LPG connection and first cylinder provided free.'
    },
    eligibilityQuestions: [
      {
        id: 'Q_AGE_18_WOMAN',
        text: {
          'hi-IN': 'क्या आपकी आयु 18 वर्ष या उससे अधिक है?',
          'ta-IN': 'உங்கள் வயது 18 அல்லது அதற்கு மேற்பட்டதா?',
          'te-IN': 'మీ వయస్సు 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ ఉందా?',
          'kn-IN': 'ನಿಮ್ಮ ವಯಸ್ಸು 18 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿದೆಯೇ?',
          'bn-IN': 'আপনার বয়স কি ১৮ বছর বা তার বেশি?',
          'mr-IN': 'तुमचे वय 18 वर्षे किंवा त्याहून अधिक आहे का?',
          'en-IN': 'Are you an adult woman (18 years or older)?'
        },
        icon: '👩'
      },
      {
        id: 'Q_RATION_CARD',
        text: {
          'hi-IN': 'क्या आपके परिवार के पास राशन कार्ड है?',
          'ta-IN': 'உங்கள் குடும்பத்திடம் குடும்ப அட்டை (ரேஷன் கார்டு) உள்ளதா?',
          'te-IN': 'మీ కుటుంబానికి రేషన్ కార్డు ఉందా?',
          'kn-IN': 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಪಡಿತರ ಚೀಟಿ ಇದೆಯೇ?',
          'bn-IN': 'আপনার পরিবারের কি রেশন কার্ড আছে?',
          'mr-IN': 'तुमच्या कुटुंबाकडे रेशन कार्ड आहे का?',
          'en-IN': 'Does your family have a Ration Card?'
        },
        icon: '📜'
      },
      {
        id: 'Q_NO_EXISTING_GAS',
        text: {
          'hi-IN': 'क्या आपके घर में पहले से गैस कनेक्शन नहीं है?',
          'ta-IN': 'உங்கள் வீட்டில் ஏற்கனவே கேஸ் இணைப்பு இல்லையா?',
          'te-IN': 'మీ ఇంట్లో ఇప్పటికే గ్యాస్ కనెక్షన్ లేదా?',
          'kn-IN': 'ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಈಗಾಗಲೇ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಇಲ್ಲವೇ?',
          'bn-IN': 'আপনার বাড়িতে কি আগে থেকে কোনো গ্যাস সংযোগ নেই?',
          'mr-IN': 'तुमच्या घरात आधीपासून गॅस कनेक्शन नाही का?',
          'en-IN': 'Is your home currently without any LPG gas connection?'
        },
        icon: '🔥'
      }
    ],
    steps: [
      {
        id: 'STEP_RATION',
        stepNumber: 1,
        totalSteps: 2,
        title: 'राशन कार्ड जोड़ें',
        icon: '📜',
        actionLabel: 'राशन कार्ड को छुएं • Touch Ration Card',
        prompts: {
          'hi-IN': {
            voice: 'पहला कदम: अपने राशन कार्ड के चित्र को छुएं।',
            simpleVoice: 'सामने दिख रहे राशन कार्ड के चित्र को छुएं।',
            confirmVoice: 'शाबाश! राशन कार्ड जुड़ गया है।'
          },
          'en-IN': {
            voice: 'First step: Touch the Ration Card image.',
            simpleVoice: 'Touch the Ration Card on the screen.',
            confirmVoice: 'Good! Ration Card linked.'
          }
        }
      },
      {
        id: 'STEP_CYLINDER_DEALER',
        stepNumber: 2,
        totalSteps: 2,
        title: 'गैस एजेंसी चुनें',
        icon: '⛽',
        actionLabel: 'गैस सिलेंडर को छुएं • Touch Gas Cylinder',
        prompts: {
          'hi-IN': {
            voice: 'दूसरा कदम: अपने पास की गैस एजेंसी चुनने के लिए सिलेंडर को छुएं।',
            simpleVoice: 'लाल रंग के सिलेंडर वाले चित्र को छुएं।',
            confirmVoice: 'बधाई हो! उज्ज्वला योजना का आवेदन जमा हो गया है।'
          },
          'en-IN': {
            voice: 'Second step: Touch the gas cylinder to select dealer.',
            simpleVoice: 'Touch the red cylinder picture.',
            confirmVoice: 'Congratulations! Your Ujjwala application is submitted.'
          }
        }
      }
    ]
  },
  {
    id: 'PM_JAN_DHAN',
    name: 'प्रधानमंत्री जन धन योजना',
    nameEnglish: 'PM Jan Dhan Bank Account',
    category: 'जीरो बैलेंस बैंक खाता',
    icon: '🏦',
    benefitText: 'बिना पैसे बैंक खाता + ₹2 लाख बीमा',
    benefitTextEnglish: 'Zero Balance Account + ₹2 Lakh Insurance',
    prompts: {
      'hi-IN': 'बिना पैसों के बैंक खाता खुलता है और 2 लाख का दुर्घटना बीमा मिलता है।',
      'ta-IN': 'பூஜ்ஜிய இருப்பில் வங்கி கணக்கு மற்றும் ₹2 லட்சம் விபத்து காப்பீடு.',
      'te-IN': 'సున్నా బ్యాలెన్స్ బ్యాంక్ ఖాతా మరియు ₹2 లక్షల ప్రమాద బీమా.',
      'kn-IN': 'ಝೀರೋ ಬ್ಯಾಲೆನ್ಸ್ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ₹2 ಲಕ್ಷ ಅಪಘಾತ ವಿಮೆ.',
      'bn-IN': 'জিরো ব্যালেন্স ব্যাংক অ্যাকাউন্ট এবং ২ লক্ষ টাকার দুর্ঘটনা বীমা।',
      'mr-IN': 'झिरो बॅलन्स बँक खाते आणि ₹2 लाख अपघात विमा मिळतो.',
      'en-IN': 'Zero balance bank account with ₹2 Lakh accident cover.'
    },
    eligibilityQuestions: [
      {
        id: 'Q_CITIZEN_INDIA',
        text: {
          'hi-IN': 'क्या आप भारत के निवासी हैं?',
          'ta-IN': 'நீங்கள் இந்தியாவின் குடிமகனா?',
          'te-IN': 'మీరు భారతదేశ పౌరులా?',
          'kn-IN': 'ನೀವು ಭಾರತದ ನಿವಾಸಿಯೇ?',
          'bn-IN': 'আপনি কি ভারতের বাসিন্দা?',
          'mr-IN': 'तुम्ही भारताचे नागरिक आहात का?',
          'en-IN': 'Are you a resident citizen of India?'
        },
        icon: '🇮🇳'
      },
      {
        id: 'Q_NO_OTHER_BANK',
        text: {
          'hi-IN': 'क्या आपके पास कोई अन्य बचत खाता नहीं है?',
          'ta-IN': 'உங்களிடம் வேறு சேமிப்பு கணக்கு இல்லையா?',
          'te-IN': 'మీ వద్ద వేరే సేవింగ్స్ ఖాతా లేదా?',
          'kn-IN': 'ನಿಮ್ಮ ಬಳಿ ಬೇರೆ ಯಾವುದೇ ಉಳಿತಾಯ ಖಾತೆ ಇಲ್ಲವೇ?',
          'bn-IN': 'আপনার কি অন্য কোনো সেভিংস অ্যাকাউন্ট নেই?',
          'mr-IN': 'तुमच्याकडे दुसरे कोणतेही बचत खाते नाही का?',
          'en-IN': 'Do you currently not have any other savings bank account?'
        },
        icon: '💳'
      }
    ],
    steps: [
      {
        id: 'STEP_SELECT_BANK',
        stepNumber: 1,
        totalSteps: 1,
        title: 'सरकारी बैंक चुनें',
        icon: '🏦',
        actionLabel: 'बैंक चिन्ह को छुएं • Touch Bank Icon',
        prompts: {
          'hi-IN': {
            voice: 'जन धन खाता खोलने के लिए बैंक वाले चित्र को छुएं।',
            simpleVoice: 'बैंक वाले निशान को छुएं।',
            confirmVoice: 'बधाई हो! आपका जन धन खाता खोलने का आवेदन स्वीकृत हो गया है।'
          },
          'en-IN': {
            voice: 'Touch the bank icon to open your Jan Dhan account.',
            simpleVoice: 'Touch the bank icon.',
            confirmVoice: 'Congratulations! Your Jan Dhan account request is submitted.'
          }
        }
      }
    ]
  }
];

export const DEFAULT_SCHEME = GOVERNMENT_SCHEMES[0];
