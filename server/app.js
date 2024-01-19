const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

const cors = require("cors");

app.use(cors());

const port = 3001;

const generateMusicTags = async (prompt) => {
  if (prompt) {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBib8DsfBlAWMudgigz8Idq3uAzF9zpzcg"
    );

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
    res.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
