import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { postImagitone } from "../../../services/imagitones";
import Send from "react-native-vector-icons/MaterialIcons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay";

const PostButton = () => {
  const [posted, setPosted] = useState(false);
  const newImagitone = useAppSelector(
    (state) => state.newImagitone.newImagitone
  );
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPost = async () => {
    setPosted(true);
    await postImagitone(newImagitone);
    navigation.navigate("Home");
  };

  if (posted) {
    return (
      <Spinner
        visible={true}
        textContent={"Posting..."}
        textStyle={{ color: "#fff" }}
      />
    );
  }
  return (
    <TouchableOpacity
      className="flex flex-row justify-around"
      style={{ gap: 10 }}
      onPress={onPost}
    >
      <Text className="text-2xl text-white font-[Montserrat-SemiBold]">
        Post
      </Text>
      <Send name="send" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default PostButton;
