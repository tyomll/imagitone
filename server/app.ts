import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateText } from "./src/controllers/textController";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/generate-text", (req, res) => {
  res.send("hello"); // TODO
});

app.post("/generate-suggestions", generateText);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
