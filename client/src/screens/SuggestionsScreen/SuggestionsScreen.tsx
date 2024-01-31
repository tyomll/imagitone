import { useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import SuggestionsList from "./SuggestionsList/SuggestionsList";
import { useState, useEffect } from "react";
import { generateSuggestions } from "../../services/suggestions";
import { ISuggestion } from "../../types/common/Suggestion";
import { HfInference } from "@huggingface/inference";
import Spinner from "react-native-loading-spinner-overlay";
import { useAppSelector } from "../../hooks/useRedux";
import { IImagitone } from "../../types/common/Imagitone";
import { HUGGING_FACE_SECRET } from "@env";
import PostButton from "./PostButton/PostButton";

const SuggestionsScreen = () => {
  const { params } = useRoute<any>();
  const photoPath: string = "file://" + params.photoPath;
  const [suggestions, setSuggestions] = useState<ISuggestion[]>();
  const inference = new HfInference(HUGGING_FACE_SECRET);
  const [isRedirected, setIsRedirected] = useState(false);
  const isSongSelected: IImagitone | undefined = useAppSelector(
    (state) => state.newImagitone.newImagitone
  );
  const getSuggestions = async () => {
    await generateSuggestions(inference, photoPath).then((suggestions) => {
      setSuggestions(suggestions);
    });
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
