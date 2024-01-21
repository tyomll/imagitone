import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { ISuggestion as SuggestionType } from "../../../types/common/Suggestion";
import Spotify from "react-native-vector-icons/FontAwesome";
import Play from "react-native-vector-icons/FontAwesome5";
import Sound from "react-native-sound";

interface ISuggestion {
  suggestion: SuggestionType;
  isPlaying: boolean;
  playPreview: () => void;
  stopPreview: () => void;
}

Sound.setCategory("Playback");

const Suggestion: FC<ISuggestion> = ({
  suggestion,
  isPlaying,
  playPreview,
  stopPreview,
}) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string>(suggestion.cover_photo);

  const onSpotifyClick = () => {
    Linking.openURL(suggestion.spotify_url);
  };

  const playAudio = () => {
    if (!suggestion.audio_preview_url) {
      console.error("Audio preview URL is missing.");
      return;
    }

    if (sound) {
      stopAudio();
    }

    const newSound = new Sound(
      suggestion.audio_preview_url,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error("Failed to load the sound", error);
        } else {
          newSound.play(() => {
            newSound.release();
            setSound(null);
          });
          setSound(newSound);
        }
      }
    );
  };

  const stopAudio = () => {
    if (sound) {
      sound.stop(() => sound.release());
      setSound(null);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.release();
        setSound(null);
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    } else {
      stopAudio();
    }
  }, [isPlaying]);

  return (
    <View className="w-full flex flex-row bg-[#48484864] py-3 px-4 rounded-lg">
      <View className="w-full flex flex-row justify-between items-start">
        <View className="flex flex-row" style={{ gap: 15 }}>
          <TouchableOpacity
            onPress={() => {
              if (isPlaying) {
                stopAudio();
                stopPreview();
              } else {
                playPreview();
              }
            }}
            className="flex items-center justify-center relative"
          >
            <Image
              className="w-[50px] h-[50px] rounded-md "
              source={{ uri: coverPhoto }}
            />
            {suggestion.audio_preview_url && (
              <Play
                name={isPlaying ? "stop" : "play"}
                size={20}
                color="white"
                style={{ position: "absolute" }}
              />
            )}
          </TouchableOpacity>

          <View className="flex flex-row h-full items-center">
            <View className="flex flex-col w-[75%]" style={{ gap: 5 }}>
              <Text className="text-white font-[Montserrat-Bold] break-all">
                {suggestion.title}
              </Text>
              <Text className="text-[#e0dfdf64] font-[Montserrat-Medium] break-all">
                {suggestion.artist}
              </Text>
            </View>
          </View>
        </View>
        <Spotify
          name="spotify"
          size={20}
          color="white"
          onPress={onSpotifyClick}
        />
      </View>
    </View>
  );
};

export default Suggestion;
