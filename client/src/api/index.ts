import axios, { AxiosResponse } from "axios";
import { Imagitone } from "../types/common/Imagitone";
import { User } from "../types/common/User";
import { convertLocalURLToBlob } from "../utils/convertLocalURLToBlob";
import { HfInference } from "@huggingface/inference";

const baseUrl = process.env.BASE_URL;

export const validateTokenApi = async (token: string) => {
  try {
    const isTokenValid = await axios.post(`${baseUrl}/auth/isAuthenticated`, {
      token,
    });

    return isTokenValid.data;
  } catch (error) {
    console.log("Error while getting token from async storage: ", error);
  }
};

export const registerApi = async (
  username: string,
  email: string,
  password: string
) => {
  return await axios.post(`${baseUrl}/auth/register`, {
    username,
    email,
    password,
  });
};

export const loginApi = async (email: string, password: string) => {
  return axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
};

export const postImagitoneApi = async (
  author: User,
  imagitone: Imagitone | undefined
) => {
  const newPhotoURL = await convertLocalURLToBlob(imagitone!.photoURL);

  if (imagitone) {
    try {
      await axios.post(`${baseUrl}/imagitones`, {
        author,
        artist: imagitone.artist,
        cover_photo: imagitone.cover_photo,
        spotify_url: imagitone.spotify_url,
        title: imagitone.title,
        audio_preview_url: imagitone.audio_preview_url,
        photoURL: newPhotoURL,
      });
    } catch (error) {
      console.error("Error in postImagitoneApi:", error);
      throw error;
    }
  }
};

const getSuggestionsApi = async (prompt: string) => {
  try {
    const spotifySuggestions: AxiosResponse = await axios.post(
      `${baseUrl}/generate-suggestions`,
      {
        prompt: prompt,
      }
    );

    return spotifySuggestions.data;
  } catch (error) {
    console.error("Error in makeApiRequest:", error);
    throw error;
  }
};

export const generateSuggestionsApi = async (
  inference: HfInference,
  photoPath: string
) => {
  try {
    const response = await fetch(photoPath);
    const blob = await response.blob();
    const res = await inference.imageToText({
      data: blob,
      model: "Salesforce/blip-image-captioning-base",
    });

    const newPrompt = `turn this text to atmospheric simple word tags and give me 10 music suggestions with title, artist, spotify url and cover photo. Give me response in valid json format Choose musics based on this words - ${res.generated_text}`;

    const result = await getSuggestionsApi(newPrompt);
    return result;
  } catch (error) {
    console.error("Error in generateSuggestions:", error);
    throw error;
  }
};

export const getMeApi = async (sessionToken: string) => {
  return await axios.post(`${baseUrl}/auth/getMe`, {
    sessionToken,
  });
};

export const getImagitionesApi = async () => {
  return await axios.get(`${baseUrl}/imagitones`);
};
