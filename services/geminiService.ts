import { GoogleGenAI } from "@google/genai";

// Robustly retrieve the API Key.
// 1. Try import.meta.env (Standard Vite way)
// 2. Try process.env (Standard Node/Webpack/Vercel way)
// 3. Fallback to empty string to prevent "process is not defined" crash.
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error
  }

  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error
  }

  return "";
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateTeamName = async (gameType: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing. Please set VITE_API_KEY in .env or API_KEY in Vercel.");
    return "Team " + Math.floor(Math.random() * 1000);
  }

  try {
    // Using a flash model for speed and cost-effectiveness
    const model = "gemini-2.5-flash-latest"; 
    const prompt = `Generate a cool, aggressive, single-word or two-word esports team name for a ${gameType} tournament. 
    It should sound professional and intimidating. Do not add quotes or explanations. Just the name.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = response.text;
    return text ? text.trim() : "Team Legends";
  } catch (error) {
    console.error("Error generating team name:", error);
    return "Team " + Math.floor(Math.random() * 1000);
  }
};
