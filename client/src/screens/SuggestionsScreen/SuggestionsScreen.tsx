import { useRoute } from "@react-navigation/native";
import { Button, SafeAreaView, Text, View } from "react-native";
import SuggestionsList from "./SuggestionsList/SuggestionsList";
import { useState, useEffect } from "react";
import { generateSuggestions } from "../../services/suggestions";
import { ISuggestion } from "../../types/common/Suggestion";
import { HfInference } from "@huggingface/inference";
import Spinner from "react-native-loading-spinner-overlay";
import { useAppSelector } from "../../hooks/useRedux";
import Send from "react-native-vector-icons/MaterialIcons";
import { IImagitone } from "../../types/common/Imagitone";
import { HUGGING_FACE_SECRET } from "@env";

const SuggestionsScreen = () => {
  const { params } = useRoute<any>();
  const photoPath: string = "file://" + params.photoPath;
  const [suggestions, setSuggestions] = useState<ISuggestion[]>();
  const inference = new HfInference(HUGGING_FACE_SECRET); // TODO
  const [isRedirected, setIsRedirected] = useState(false);
  const isSongSelected: IImagitone | {} = useAppSelector(
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
          {Object.keys(isSongSelected).length > 0 && (
            <View className="flex flex-row justify-around" style={{ gap: 10 }}>
              <Text className="text-2xl text-white font-[Montserrat-SemiBold]">
                Post
              </Text>
              <Send name="send" size={30} color="white" onPress={() => {}} />
            </View>
          )}
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
