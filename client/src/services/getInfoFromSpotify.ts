import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@env";
import axios from "axios";
import qs from "qs";
import { ISuggestion } from "../types/common/Suggestion";
import { Buffer } from "buffer";

export const getInfoFromSpotify = async (suggestions: ISuggestion[]) => {
  let spotify_suggestions: ISuggestion[] = [];

  try {
    const clientId = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;

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
      } catch (error: any) {
        console.error("Error fetching suggestion:", suggestion, error);
        console.error("Error details:", error.response?.data || error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
  }

  return spotify_suggestions.slice(0, 6);
};
