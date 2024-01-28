import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { postImagitone } from "../../../services/imagitones";
import Send from "react-native-vector-icons/MaterialIcons";

const PostButton = () => {
  const newImagitone = useAppSelector(
    (state) => state.newImagitone.newImagitone
  );

  return (
    <TouchableOpacity
      className="flex flex-row justify-around"
      style={{ gap: 10 }}
      onPress={() => postImagitone(newImagitone)}
    >
      <Text className="text-2xl text-white font-[Montserrat-SemiBold]">
        Post
      </Text>
      <Send name="send" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default PostButton;
