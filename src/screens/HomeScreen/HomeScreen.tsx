import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ImaginationsList from "../../components/ImaginationsList/ImaginationsList";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex items-center w-full h-full bg-[#1B1926]">
      <ImaginationsList />
    </SafeAreaView>
  );
};

export default HomeScreen;
