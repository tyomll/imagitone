import { View, Text } from "react-native";
import React, { FC } from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { User } from "../../../types/common/User";

interface IAuthor {
  username: User | string;
  date: string;
}
const Author: FC<IAuthor> = ({ username, date }) => {
  return (
    <View className="flex flex-row items-center">
      <UserAvatar size={45} borderRadius="full" />
      <View className="ml-[10px]">
        <Text className="text-[15px] text-white font-[Montserrat-SemiBold]">
          {typeof username === "string" && username}
        </Text>
        <Text className="text-[12px] text-[#f8eee0ba] font-[Montserrat-Medium]">
          {date}
        </Text>
      </View>
    </View>
  );
};

export default Author;
