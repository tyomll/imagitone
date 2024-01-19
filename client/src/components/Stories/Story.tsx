import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

const Story = () => {
  return (
    <View className="flex flex-col items-center" style={{ gap: 5 }}>
      <UserAvatar size={50} borderRadius="full" ring />
      <Text className="text-center text-[#f8eee09f] font-[Montserrat-Medium] text-xs break-all w-[80px]">
        {"Artyom.Hovsepyan".slice(0, 9) + "..."}
      </Text>
    </View>
  );
};

export default Story;
