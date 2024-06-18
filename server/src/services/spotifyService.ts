import axios from "axios";
import qs from "qs";
import { Suggestion } from "../types/Suggestion";

export const getInfoFromSpotify = async (suggestions: Suggestion[]) => {
  let spotifySuggestions = [];

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const encodedCredentials = Buffer.from(
    clientId + ":" + clientSecret
  ).toString("base64");

  const accessTokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: "Basic " + encodedCredentials,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const accessToken = accessTokenResponse.data.access_token;

  try {
    for (const suggestion of suggestions) {
      try {
        if (accessToken) {
          const query = `q=track:${suggestion.title} artist:${suggestion.artist}&limit=10&type=track`;
          const searchResponse = await axios.get(
            `https://api.spotify.com/v1/search?${query}`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );

          if (searchResponse.data.tracks.items.length > 0) {
            const track = searchResponse.data.tracks.items[0];
            spotifySuggestions.push({
              artist: suggestion.artist || "",
              cover_photo: track.album.images[0].url || "",
              spotify_url: track.external_urls.spotify || "",
              title: suggestion.title || "",
              audio_preview_url: track.preview_url ? track.preview_url : "",
            });
          }
        } else {
          console.error("ACCESS TOKEN IS NOT FOUND.");
        }
      } catch (error: any) {
        console.error("Error fetching suggestion:", suggestion, error);
        console.error("Error details:", error.response?.data || error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
  }

  return spotifySuggestions.slice(0, 6);
};
