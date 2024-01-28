import express from "express";
import Imagitone from "../models/Imagitone";

const router = express.Router();

router.post("/", async (req, res) => {
  const newImagitone = new Imagitone(req.body);

  try {
    await newImagitone.save();
    res.status(201).json({ message: "Imagitone created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating imagiton" });
  }
});

export default router;
