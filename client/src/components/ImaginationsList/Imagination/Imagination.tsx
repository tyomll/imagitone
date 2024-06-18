import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { User } from "../../../types/common/User";
import Author from "./Author";
import Sound from "react-native-sound";
import Play from "react-native-vector-icons/FontAwesome5";

interface Imagination {
  author: User;
  photoURL: string;
  musicName: string;
  artistName: string;
  audioPreviewUrl: string;
  isPlaying: boolean;
  playPreview: () => void;
  stopPreview: () => void;
}
const Imagination: FC<Imagination> = ({
  author,
  photoURL,
  musicName,
  artistName,
  audioPreviewUrl,
  isPlaying,
  playPreview,
  stopPreview,
}) => {
  const [sound, setSound] = useState<Sound | null>(null);

  const playAudio = () => {
    if (!audioPreviewUrl) {
      console.error("Audio preview URL is missing.");
      return;
    }

    if (sound) {
      stopAudio();
    }

    const newSound = new Sound(audioPreviewUrl, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("Failed to load the sound", error);
      } else {
        newSound.play(() => {
          newSound.release();
          setSound(null);
        });
        setSound(newSound);
      }
    });
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
    <View className={`w-full h-[60vh] mt-[20px]`}>
      <ImageBackground
        source={{ uri: photoURL }}
        resizeMode="cover"
        className="flex-1 justify-between p-5"
        imageStyle={{ borderRadius: 20 }}
      >
        <View className="pr-4 flex flex-row items-center justify-between">
          <Author author={author} date="Jan 2024" />
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
            {audioPreviewUrl && (
              <Play
                name={isPlaying ? "stop" : "play"}
                size={20}
                color="white"
                style={{ position: "absolute" }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-white text-2xl font-[Montserrat-SemiBold]">
            {musicName}
          </Text>
          <Text className="text-white text-l text-[#fffbf7c6] font-[Montserrat-Medium]">
            {artistName}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Imagination;
