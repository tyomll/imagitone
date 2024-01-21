const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const qs = require("qs");
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

const getInfoFromSpotify = async (suggestions) => {
  let spotify_suggestions = [];

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const encodedCredentials = Buffer.from(
      clientId + ":" + clientSecret
    ).toString("base64");

    const accessTokenResponse = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: "Basic " + encodedCredentials,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ grant_type: "client_credentials" }),
    });

    const accessToken = accessTokenResponse.data.access_token;

    for (const suggestion of suggestions) {
      try {
        const query = `q=track:${suggestion.title} artist:${suggestion.artist}&limit=20&type=track`;
        const searchResponse = await axios({
          method: "get",
          url: `https://api.spotify.com/v1/search?${query}`,
          headers: {
            Authorization: "Bearer " + accessToken,
            "content-type": "application/json",
          },
        });

        setTimeout(() => {}, 300);
        if (searchResponse.data.tracks.items.length > 0) {
          const track = searchResponse.data.tracks.items[0];
          spotify_suggestions.push({
            artist: suggestion.artist,
            cover_photo: track.album.images[0].url,
            spotify_url: track.external_urls.spotify,
            title: suggestion.title,
            audio_preview_url: track.preview_url ? track.preview_url : "",
          });
        }
      } catch (error) {
        console.error("Error fetching suggestion:", suggestion, error);
        console.error("Error details:", error.response?.data || error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
  }

  return spotify_suggestions.slice(0, 6);
};

app.get("/generate-text", (req, res) => {
  res.send("hello"); // TODO
});

app.post("/generate-text", express.json(), async (req, res) => {
  try {
    // TODO: Refactor code
    const { prompt } = req.body;
    const text = await generateMusicTags(prompt);
    const r = text.replace("```json", "");
    const f = r.replace("```", "");
    const suggestions = JSON.parse(f).music_suggestions;

    const spotifySuggestions = await getInfoFromSpotify(suggestions);
    res.send(JSON.stringify(spotifySuggestions));
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
