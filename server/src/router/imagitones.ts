import express from "express";
import { getImagitones, postImagitone } from "../controllers/imagitones";

export default (router: express.Router) => {
  router.post("/imagitones", postImagitone);
  router.get("/imagitones", getImagitones);
};
