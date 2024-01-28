import mongoose from "mongoose";

interface ImagitoneDocument extends mongoose.Document {
  artist: string;
  cover_photo: string;
  spotify_url: string;
  title: string;
  audio_preview_url: string;
  photoURL: string;
}

const ImagitoneSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  cover_photo: { type: String, required: true },
  spotify_url: { type: String, required: true },
  title: { type: String, required: true },
  audio_preview_url: { type: String, required: false },
  photoURL: { type: String, required: true },
});

export default mongoose.models.Imagitone ||
  mongoose.model<ImagitoneDocument>("Imagitone", ImagitoneSchema, "Imagitones");
