import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
import { useAppSelector } from "../../../hooks/useRedux";

const Header = () => {
  const me = useAppSelector((state) => state.users.user);
  return (
    <View className="flex flex-row items-center justify-around">
      <Icon name="user-friends" size={20} color="black" />
      <Text className="ml-[10px] text-2xl text-white font-[Montserrat-Bold]">
        Imagitone
      </Text>
      <UserAvatar
        avatarUrl={me.avatar}
        size={40}
        borderRadius="full"
        ring={false}
      />
    </View>
  );
};

export default Header;
