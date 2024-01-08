import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserAvatar from "../UserAvatar/UserAvatar";

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-around">
      <Icon name="user-friends" size={20} color="black" />
      <Text
        className="ml-[10px] text-2xl text-white font-[Montserrat-Bold]"
        // TODO: change this to actual logo
      >
        Imagitone
      </Text>
      <UserAvatar size={30} borderRadius="full" ring={false} />
    </View>
  );
};

export default Header;
