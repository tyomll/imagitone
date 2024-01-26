import { Request, Response } from "express";
import { ISuggestion } from "../types/Suggestion";
import { generateMusicTags } from "../services/generativeAIService";
import { getInfoFromSpotify } from "../services/spotifyService";

export const generateText = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const text = await generateMusicTags(prompt);
    if (text) {
      const cleanedText = text.replace("```json", "").replace("```", "");
      const suggestions: ISuggestion[] =
        JSON.parse(cleanedText).music_suggestions;

      const spotifySuggestions = await getInfoFromSpotify(suggestions);
      res.send(JSON.stringify(spotifySuggestions));
    } else {
      res.status(400).send("Invalid input: 'text' is undefined");
    }
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).send("Internal Server Error");
  }
};
