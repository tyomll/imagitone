import { View } from "react-native";
import React, { FC, useState } from "react";
import { ISuggestion } from "../../../types/common/Suggestion";
import Suggestion from "./Suggestion";

interface ISuggestionsList {
  suggestions: ISuggestion[];
  photoURL: string;
}

const SuggestionsList: FC<ISuggestionsList> = ({ suggestions, photoURL }) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<
    number | null
  >(null);

  const playPreview = (index: number) => {
    setCurrentlyPlayingIndex(index);
  };

  const stopPreview = () => {
    setCurrentlyPlayingIndex(null);
  };
  return (
    <View
      className="flex flex-col justify-center w-[90%] h-[92%]"
      style={{ gap: 20 }}
    >
      {suggestions.slice(0, 5).map((suggestion: ISuggestion, i: number) => {
        return (
          <Suggestion
            key={suggestion.title + i}
            suggestion={suggestion}
            isPlaying={currentlyPlayingIndex === i}
            playPreview={() => playPreview(i)}
            stopPreview={stopPreview}
            photoURL={photoURL}
          />
        );
      })}
    </View>
  );
};

export default SuggestionsList;
