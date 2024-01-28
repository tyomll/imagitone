import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateText } from "./src/controllers/textController";
import connectDB from "./src/config/db";
import ImagitonesController from "./src/controllers/ImagitonesController";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());

app.use(express.json());
app.use("/api/imagitones", ImagitonesController);

app.get("/generate-text", (req, res) => {
  res.send("hello"); // TODO
});

app.post("/generate-suggestions", generateText);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
