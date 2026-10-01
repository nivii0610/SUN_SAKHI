import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SUN SAKHI Gemini Proxy API' });
});

/**
 * POST /api/gemini
 * Secure backend proxy for Gemini AI inference.
 * Receives user speech transcript and current workflow context, returns simple spoken response + intent.
 */
app.post('/api/gemini', async (req, res) => {
  try {
    const { userText, language, currentStep, serviceContext } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback response generator if API key is unconfigured or call fails
    const getFallbackResponse = () => {
      const text = (userText || '').toLowerCase();
      
      // Confusion detection fallback
      if (
        text.includes('नहीं समझ') || 
        text.includes('मदद') || 
        text.includes('help') || 
        text.includes('dont understand') ||
        text.includes('don\'t understand') ||
        text.includes('புரியவில்லை') ||
        text.includes('అర్థం కాలేదు') ||
        text.includes('ತಿಳಿಯಲಿಲ್ಲ')
      ) {
        return {
          responseText: "कोई बात नहीं। मैं आपको फिर से दिखाती हूँ। बटन को छुएं।",
          intent: "CONFUSION",
          needsHelp: true,
          continueStep: true
        };
      }

      // Start service intent fallback
      if (
        text.includes('योजना') || 
        text.includes('सरकारी') || 
        text.includes('पैसे') || 
        text.includes('मदद') || 
        text.includes('scheme') || 
        text.includes('matru') || 
        text.includes('maternity') ||
        text.includes('தமிழ்') ||
        text.includes('నమస్కారం') ||
        text.includes('hello') ||
        text.includes('hi')
      ) {
        return {
          responseText: "मैं मातृ वंदना सहायता योजना में आपकी मदद करूँगी। चलिए शुरू करते हैं।",
          intent: "START_SERVICE",
          needsHelp: false,
          continueStep: true
        };
      }

      return {
        responseText: "मैंने आपकी बात सुन ली है। आगे बढ़ने के लिए बटन को छुएं।",
        intent: "GENERAL_QUERY",
        needsHelp: false,
        continueStep: true
      };
    };

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('⚠️ GEMINI_API_KEY is not configured in .env. Returning intelligent fallback response.');
      return res.json(getFallbackResponse());
    }

    const langName = language?.name || 'Hindi';
    const langNative = language?.nativeName || 'हिन्दी';

    const systemPrompt = `You are SUN SAKHI, a friendly digital voice companion for illiterate rural women in India.

CRITICAL INSTRUCTIONS:
1. Respond ONLY in the requested language: ${langName} (${langNative}).
2. Use EXTREMELY SIMPLE spoken language (1 to 2 short sentences max).
3. Do NOT use technical terms, paragraphs, or written bullet lists.
4. ASK ONLY ONE QUESTION AT A TIME.
5. NEVER invent government schemes, deadlines, or false eligibility rules.
6. Detect if the user is confused (saying "I don't understand", "help", "what to do", or sounding lost).

CONTEXT:
Current Workflow Step: "${currentStep || 'MAIN_VOICE'}"
Service Context: "${JSON.stringify(serviceContext || {})}"

YOUR TASK:
Analyze the user's input: "${userText}"
Return a JSON object strictly matching this schema:
{
  "responseText": "Short spoken response in ${langNative}",
  "intent": "START_SERVICE" | "CHECK_ELIGIBILITY" | "SELECT_SCHEME" | "CONFUSION" | "STEP_COMPLETE" | "GENERAL_QUERY",
  "needsHelp": boolean,
  "continueStep": boolean
}
Return ONLY valid JSON.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!geminiResponse.ok) {
      console.error(`Gemini API HTTP Error: ${geminiResponse.status}`);
      return res.json(getFallbackResponse());
    }

    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (rawText) {
      const parsed = JSON.parse(rawText);
      return res.json({
        responseText: parsed.responseText || "बहुत बढ़िया। चलिए आगे बढ़ते हैं।",
        intent: parsed.intent || "GENERAL_QUERY",
        needsHelp: Boolean(parsed.needsHelp),
        continueStep: true
      });
    }

    return res.json(getFallbackResponse());
  } catch (error) {
    console.error('Gemini Backend Proxy Error:', error);
    // Graceful fallback response so interface never crashes
    return res.json({
      responseText: "कोई बात नहीं, चलिए दोबारा कोशिश करते हैं।",
      intent: "CONFUSION",
      needsHelp: true,
      continueStep: true
    });
  }
});

app.listen(PORT, () => {
  console.log(`☀️ SUN SAKHI Backend running on http://localhost:${PORT}`);
});
