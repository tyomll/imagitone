import mongoose from "mongoose";

const ImagitoneSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true },
    username: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
    },
  },
  artist: { type: String, required: true },
  cover_photo: { type: String, required: true },
  spotify_url: { type: String, required: true },
  title: { type: String, required: true },
  audio_preview_url: { type: String, required: false },
  photoURL: { type: String, required: true },
});

export const ImagitioneModel = mongoose.model(
  "Imagitone",
  ImagitoneSchema,
  "Imagitones"
);

export const getAllImagitones = () => ImagitioneModel.find();
