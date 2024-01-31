import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateMusicTags = async (prompt: string) => {
  if (prompt) {
    if (!process.env.GOOGLE_ACCESS_TOKEN) {
      console.error(
        "Google Access Token is undefined. Please set the environment variable."
      );
    } else {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_ACCESS_TOKEN);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const text = await model
          .generateContent(prompt)
          .then((result) => {
            return result.response.text();
          })
          .catch((error) => {
            console.error("Errror while generating content: ", error);
          });
        return text;
      } catch (error) {
        console.error("generate Music tags - ", error);
        throw error;
      }
    }
  }
};
