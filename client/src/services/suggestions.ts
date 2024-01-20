import { HfInference } from "@huggingface/inference";
import axios from "axios";
import { getInfoFromSpotify } from "./getInfoFromSpotify";

export async function generateSuggestions(
  inference: HfInference,
  photoPath: string
) {
  try {
    const response = await fetch(photoPath);
    const blob = await response.blob();
    const res = await inference.imageToText({
      data: blob,
      model: "Salesforce/blip-image-captioning-base",
    });

    const newPrompt = `turn this text to atmospheric simple word tags and give me 10 music suggestions with title, artist, spotify url and cover photo. Give me response in valid json format Choose musics based on this words - ${res.generated_text}`;

    const result = await makeApiRequest(newPrompt);
    return result;
  } catch (error) {
    console.error("Error in generateSuggestions:", error);
    throw error;
  }
}

async function makeApiRequest(prompt: string) {
  try {
    const response = await axios.post(
      "http://192.168.0.105:3001/generate-text",
      {
        prompt: prompt,
      }
    );
    const suggestions = response.data.music_suggestions;

    const spotify_suggestions = await getInfoFromSpotify(suggestions);

    return spotify_suggestions;
  } catch (error) {
    console.error("Error in makeApiRequest:", error);
    throw error;
  }
}
