import { GoogleGenAI } from "@google/genai";

// WARNING: In a real production app, API keys should not be exposed on the frontend.
// For this "Master Prompt" exercise, we assume the environment variable is injected safely or this is a demo.
const apiKey = process.env.API_KEY || ""; 

const ai = new GoogleGenAI({ apiKey });

export const generateTeamName = async (gameType: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return "Team " + Math.floor(Math.random() * 1000);
  }

  try {
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