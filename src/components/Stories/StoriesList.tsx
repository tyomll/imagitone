import { ScrollView, View } from "react-native";
import React from "react";
import Story from "./Story";

const StoriesList = () => {
  return (
    <ScrollView
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        className="flex flex-row w-full justify-center items-center"
        style={{ gap: 13 }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => {
          return <Story key={i} />;
        })}
      </View>
    </ScrollView>
  );
};

export default StoriesList;
