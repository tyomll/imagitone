import { SafeAreaView, Text } from "react-native";
import React from "react";
import ImaginationsList from "../../components/ImaginationsList/ImaginationsList";
import Stories from "../../components/Stories";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex flex-col items-center w-full h-full bg-[#1B1926] p-5">
      <Stories />
      <ImaginationsList />
    </SafeAreaView>
  );
};

export default HomeScreen;
