import React from "react";
import StoriesList from "./StoriesList";
import { View } from "react-native";

const Stories = () => {
  return (
    <View className="flex flex-col w-full mt-5" style={{ gap: 20 }}>
      <StoriesList />
    </View>
  );
};

export default Stories;
