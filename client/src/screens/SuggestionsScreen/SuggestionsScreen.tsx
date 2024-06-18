import { useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import SuggestionsList from "./SuggestionsList/SuggestionsList";
import { useState, useEffect } from "react";
import { Suggestion } from "../../types/common/Suggestion";
import { HfInference } from "@huggingface/inference";
import Spinner from "react-native-loading-spinner-overlay";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { Imagitone } from "../../types/common/Imagitone";
import { HUGGING_FACE_SECRET } from "@env";
import PostButton from "./PostButton/PostButton";
import { generateSuggestions } from "../../redux/imagitones/slice";

const SuggestionsScreen = () => {
  const { params } = useRoute<any>();
  const dispatch = useAppDispatch();
  const photoPath: string = "file://" + params.photoPath;
  const [suggestions, setSuggestions] = useState<Suggestion[]>();
  const inference = new HfInference(HUGGING_FACE_SECRET);
  const [isRedirected, setIsRedirected] = useState(false);
  const isSongSelected: Imagitone | null = useAppSelector(
    (state) => state.imagitones.newImagitone
  );
  const getSuggestions = async () => {
    const response = await dispatch(
      generateSuggestions({ inference, photoPath })
    );
    if (generateSuggestions.fulfilled.match(response)) {
      setSuggestions(response.payload);
    }
  };

  useEffect(() => {
    if (!isRedirected) {
      setIsRedirected(true);
      getSuggestions();
    }
  }, []);

  return (
    <SafeAreaView className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2">
      {suggestions ? (
        <View className="flex flex-col items-center">
          <Text className="text-white text-2xl font-[Montserrat-Bold]">
            Choose your vibe
          </Text>
          <SuggestionsList suggestions={suggestions} photoURL={photoPath} />
          {isSongSelected && <PostButton />}
        </View>
      ) : (
        <Spinner
          visible={true}
          textContent={"Hearing the photo..."}
          textStyle={{ color: "#fff" }}
        />
      )}
    </SafeAreaView>
  );
};

export default SuggestionsScreen;
