import express from "express";
import Imagitone from "../models/Imagitone";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", async (req, res) => {
  const imagitone = new Imagitone(req.body);
  const imageURL = imagitone.photoURL;
  const storageRef = ref(storage, `images/${uuidv4()}`);

  const snapshot = await uploadString(storageRef, imageURL, "data_url");
  const downloadURL = await getDownloadURL(snapshot.ref);

  let newImagitone = imagitone;
  newImagitone.photoURL = downloadURL;

  try {
    await newImagitone.save();
    res.status(201).json({ message: "Imagitone created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating imagiton" });
  }
});

export default router;
