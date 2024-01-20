const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

const port = 3001;

const generateMusicTags = async (prompt) => {
  if (prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_ACCESS_TOKEN);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
};

app.post("/generate-text", express.json(), async (req, res) => {
  try {
    const { prompt } = req.body;
    const text = await generateMusicTags(prompt);
    const r = text.replace("```json", "");
    const f = r.replace("```", "");
    res.send(f);
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
