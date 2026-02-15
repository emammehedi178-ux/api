import { GoogleGenAI } from "@google/genai";

// SAFELY access the API Key. 
// In Vite, `process` is not defined in the browser. We check for it to prevent crashes.
// Note: In a standard Vite setup, you should use `import.meta.env.VITE_API_KEY`.
// However, assuming Vercel Environment Variables are set, we handle the access safely.
const apiKey = (typeof process !== "undefined" && process.env && process.env.API_KEY) || "";

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
