import { View, Text, ImageBackground } from "react-native";
import React, { FC } from "react";
import { User } from "../../../types/common/User";
import UserAvatar from "../../UserAvatar/UserAvatar";
import Author from "./Author";

interface IImagination {
  author: User | string; // TODO: remove string type (it's just for test)
  imageURL: string;
  musicName: string;
  artistName: string;
}
const Imagination: FC<IImagination> = ({
  author,
  imageURL,
  musicName,
  artistName,
}) => {
  return (
    <View className={`w-full h-[60vh] mt-[20px] rounded-[13px]`}>
      <ImageBackground
        source={{ uri: imageURL }}
        resizeMode="cover"
        className="flex-1 justify-between p-5"
        imageStyle={{ borderRadius: 13 }}
      >
        <Author username={author} date="Jan 2024" />
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
