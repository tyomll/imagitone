import axios from "axios";
import { IImagitone } from "../types/common/Imagitone";

export const postImagitone = async (imagitone: IImagitone | undefined) => {
  if (imagitone) {
    try {
      await axios.post("http://192.168.0.103:3001/api/imagitones", {
        artist: imagitone.artist,
        cover_photo: imagitone.cover_photo,
        spotify_url: imagitone.spotify_url,
        title: imagitone.title,
        audio_preview_url: imagitone.audio_preview_url,
        photoURL: imagitone.photoURL,
      });
    } catch (error) {
      console.error("Error in makeApiRequest:", error);
      throw error;
    }
  }
};
