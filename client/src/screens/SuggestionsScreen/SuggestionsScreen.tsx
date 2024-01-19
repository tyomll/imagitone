import { HfInference } from "@huggingface/inference";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";

const SuggestionsScreen = () => {
  const { params } = useRoute<any>();
  const photoPath: string = "file://" + params.photoPath;

  const [prompt, setPrompt] = useState<any>();

  const inference = new HfInference("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");

  async function esim() {
    try {
      const res = await inference.imageToText({
        data: await (
          await fetch("https://picsum.photos/id/870/536/354?grayscale&blur=2")
        ).blob(),
        model: "Salesforce/blip-image-captioning-base",
      });

      setPrompt(
        `turn this text to atmospheric simple word tags and give me music links based on this words with json format - ${res.generated_text}`
      );

      await makeApiRequest();
    } catch (error) {
      console.error("Error in esim:", error);
    }
    async function makeApiRequest() {
      try {
        const response = await axios.post(
          "http://192.168.0.102:3001/generate-text",
          {
            prompt: prompt,
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error in makeApiRequest:", error);
      }
    }
  }

  useEffect(() => {
    esim();
  }, []);

  return (
    <SafeAreaView
      className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2"
      style={{ gap: 50 }}
    >
      <Text className="text-white">{photoPath}</Text>
    </SafeAreaView>
  );
};

export default SuggestionsScreen;
