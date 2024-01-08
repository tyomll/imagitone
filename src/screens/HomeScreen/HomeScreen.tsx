import { SafeAreaView, ScrollView, Text } from "react-native";
import React from "react";
import ImaginationsList from "../../components/ImaginationsList/ImaginationsList";
import Stories from "../../components/Stories";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="flex flex-col "
      >
        <Stories />
        <ImaginationsList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
