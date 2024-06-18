import { View, Text } from "react-native";
import React, { FC } from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { User } from "../../../types/common/User";

interface IAuthor {
  author: User;
  date: string;
}
const Author: FC<IAuthor> = ({ author, date }) => {
  return (
    <View className="flex flex-row items-center">
      <UserAvatar
        avatarUrl={author.avatar}
        size={45}
        borderRadius="full"
        ring
      />
      <View className="ml-[10px]">
        <Text className="text-[15px] text-white font-[Montserrat-SemiBold]">
          {author.username}
        </Text>
        <Text className="text-[12px] text-[#f8eee0ba] font-[Montserrat-Medium]">
          {date}
        </Text>
      </View>
    </View>
  );
};

export default Author;
