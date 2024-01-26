import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateMusicTags = async (prompt: string) => {
  if (prompt) {
    if (!process.env.GOOGLE_ACCESS_TOKEN) {
      console.error(
        "Google Access Token is undefined. Please set the environment variable."
      );
    } else {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_ACCESS_TOKEN);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
      } catch (error) {
        console.error("generate Music tags - ", error);
        throw error;
      }
    }
  }
};
