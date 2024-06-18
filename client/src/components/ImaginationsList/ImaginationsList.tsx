import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Imagination from "./Imagination/Imagination";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getImagitones } from "../../redux/imagitones/slice";

const ImaginationsList = () => {
  const dispatch = useAppDispatch();
  const imagitonesState = useAppSelector((state) => state.imagitones);
  const imagitones = imagitonesState.imagitones;
  const newImagitone = imagitonesState.newImagitone;
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<
    number | null
  >(null);

  const playPreview = (index: number) => {
    setCurrentlyPlayingIndex(index);
  };

  const stopPreview = () => {
    setCurrentlyPlayingIndex(null);
  };

  useEffect(() => {
    dispatch(getImagitones());
  }, [newImagitone]);

  return (
    <View className="flex flex-col justify-center w-full">
      {imagitones.map((imagination, i) => (
        <Imagination
          key={i}
          author={imagination.author}
          photoURL={imagination.photoURL}
          musicName={imagination.title}
          artistName={imagination.artist}
          audioPreviewUrl={imagination.audio_preview_url}
          stopPreview={stopPreview}
          playPreview={() => playPreview(i)}
          isPlaying={currentlyPlayingIndex === i}
        />
      ))}
    </View>
  );
};

export default ImaginationsList;
