import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TcmAnalysis, Language, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (language: Language) => {
  const langName = language === 'zh' ? 'Simplified Chinese (zh-CN)' : 'English';
  const toneInstruction = language === 'zh' 
    ? 'Use a "New Chinese Style" (新中式养生) tone: professional yet warm, using proper TCM terminology (e.g., 脾虚湿盛, 肝郁气滞) explained in accessible language.'
    : 'Your vibe is "old Eastern wisdom meets cool, minimal NYC wellness culture." Keep it chic and accessible.';

  return `
You are NourishMe, a chic, modern Traditional Chinese Medicine (TCM) wellness companion. 
${toneInstruction}
Your goal is to help users maintain energy and balance.

Analyze the user's uploaded images (Face, Hand, and Tongue) AND their Profile (Birth Date/Time/Location + Current Location) to determine their TCM constitution.

1. **Astrology Analysis**: Calculate the user's Chinese Zodiac Animal and Birth Element based on the provided birth date and time. Use the Birth Location to adjust for solar time if necessary for accuracy.
2. **Seasonal Adjustment**: Use the **Current Location** to determine the current season/climate for the user. Adjust food and lifestyle recommendations accordingly (e.g., if they are in a cold winter climate, suggest warming foods; if tropical/summer, cooling foods).
3. **Visual Analysis**:
   - Face: Pale (Qi/Blood deficiency), Red (Heat), Dull (Stagnation), Puffy (Dampness).
   - Hand: Red palms (Heat), Pale nails (Blood deficiency), Blue veins (Cold/Stagnation).
   - Tongue: Color (pale, red, purple), Coating (white, yellow, thick, peeled), Shape (swollen, teeth marks, cracks).

Combine these inputs into a TCM pattern (e.g., Qi Deficiency, Yin Deficiency, Damp-Heat, Liver Qi Stagnation).
Provide gentle, non-medical advice. Focus on food, tea, and lifestyle.
Be supportive and warm. Never diagnose medical conditions.

IMPORTANT:
- Provide the JSON response values in ${langName}.
- The JSON keys must remain in English as defined in the schema.
`;
};

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    pattern: {
      type: Type.STRING,
      description: "The primary TCM pattern identified. Keep it short.",
    },
    astrology: {
      type: Type.OBJECT,
      properties: {
        animal: { type: Type.STRING, description: "Chinese Zodiac Animal (e.g., Dragon)." },
        element: { type: Type.STRING, description: "Birth Element (e.g., Wood, Fire)." },
        insight: { type: Type.STRING, description: "How their zodiac/element influences their health constitution." }
      },
      required: ["animal", "element", "insight"]
    },
    visualCues: {
      type: Type.OBJECT,
      properties: {
        face: { type: Type.STRING, description: "Analysis of face, skin tone, eyes, lips." },
        hand: { type: Type.STRING, description: "Analysis of palm color, moisture, nails." },
        tongue: { type: Type.STRING, description: "Analysis of tongue color, coating, and shape." }
      },
      required: ["face", "hand", "tongue"]
    },
    interpretation: {
      type: Type.STRING,
      description: "A warm, accessible explanation of what the pattern means for their energy and body."
    },
    foodRecommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING, description: "Name of the food." },
          reason: { type: Type.STRING, description: "Why this food helps the pattern." }
        },
        required: ["item", "reason"]
      }
    },
    drinkRecommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING, description: "Name of the drink/tea." },
          reason: { type: Type.STRING, description: "Why this drink helps the pattern." }
        },
        required: ["item", "reason"]
      }
    },
    lifestyleRituals: {
      type: Type.ARRAY,
      items: { type: Type.STRING, description: "Simple, chic daily habits." }
    },
    avoid: {
      type: Type.ARRAY,
      items: { type: Type.STRING, description: "Foods or habits to minimize." }
    },
    vibeCheck: {
      type: Type.STRING,
      description: "A short, fun, encouraging summary of their current energy state."
    },
    elementalBalance: {
      type: Type.OBJECT,
      description: "A score from 0 to 100 for each of the 5 elements representing their current state.",
      properties: {
        wood: { type: Type.NUMBER },
        fire: { type: Type.NUMBER },
        earth: { type: Type.NUMBER },
        metal: { type: Type.NUMBER },
        water: { type: Type.NUMBER }
      },
      required: ["wood", "fire", "earth", "metal", "water"]
    },
    yinYangBalance: {
      type: Type.NUMBER,
      description: "A number 0-100. 0 is Extreme Yin, 100 is Extreme Yang, 50 is Balanced."
    }
  },
  required: [
    "pattern", "astrology", "visualCues", "interpretation", "foodRecommendations", 
    "drinkRecommendations", "lifestyleRituals", "avoid", "vibeCheck", 
    "elementalBalance", "yinYangBalance"
  ]
};

export const analyzeHealth = async (
  faceImageBase64: string, 
  handImageBase64: string, 
  tongueImageBase64: string,
  userProfile: UserProfile,
  language: Language
): Promise<TcmAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            text: `Analyze these images and profile for a TCM wellness checkup. 
            User Profile:
            - Birth Date: ${userProfile.birthDate}
            - Birth Time: ${userProfile.birthTime}
            - Birth Place: ${userProfile.birthPlace}
            - Current Location: ${userProfile.currentLocation}
            
            Images: 1: Face, 2: Hand, 3: Tongue. 
            Output Language: ${language}.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: faceImageBase64
            }
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: handImageBase64
            }
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: tongueImageBase64
            }
          }
        ]
      },
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: analysisSchema
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as TcmAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
