import { View } from "react-native";
import React, { FC, useState } from "react";
import { ISuggestion } from "../../../types/common/Suggestion";
import Suggestion from "./Suggestion";

interface ISuggestionsList {
  suggestions: ISuggestion[];
}

const SuggestionsList: FC<ISuggestionsList> = ({ suggestions }) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number | null>(null);

  const playPreview = (index: number) => {
    setCurrentlyPlayingIndex(index);
  };

  const stopPreview = () => {
    setCurrentlyPlayingIndex(null)
  }
  

  return (
    <View className="flex flex-col justify-center w-[90%] h-full" style={{ gap: 20 }}>
      {suggestions.map((suggestion: ISuggestion, i: number) => {
        return (
          <Suggestion
            key={suggestion.title + i}
            suggestion={suggestion}
            isPlaying={currentlyPlayingIndex === i}
            playPreview={() => playPreview(i)}
            stopPreview={stopPreview}
          />
        );
      })}
    </View>
  );
};

export default SuggestionsList;