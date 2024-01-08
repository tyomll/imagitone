import React from "react";
import StoriesList from "./StoriesList";
import { Text, View } from "react-native";

const Stories = () => {
  return (
    <View className="flex flex-col w-full" style={{ gap: 20 }}>
      <Text className="ml-[10px] text-3xl text-white font-[Montserrat-SemiBold]">
        Imagitone
      </Text>
      <StoriesList />
    </View>
  );
};

export default Stories;
