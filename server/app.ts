import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import { generateText } from "./src/controllers/textController";
import connectDB from "./src/config/db";
import router from "./src/router";
import ImagitonesController from "./src/controllers/imagitonesController";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/", router());
app.use("/api/imagitones", ImagitonesController);

app.get("/generate-text", (req, res) => {
  res.send("hello"); // TODO
});

app.post("/generate-suggestions", generateText); // TODO: move to router folder

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
