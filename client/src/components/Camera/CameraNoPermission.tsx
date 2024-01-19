import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ICameraNoPermission {
  onRequestPermission: () => void;
}
const CameraNoPermission: FC<ICameraNoPermission> = ({
  onRequestPermission,
}) => {
  return (
    <View className="flex flex-col items-center justify-center">
      <Icon name="camera-off-outline" size={100} color="black" />
      <Text className="font-[Montserrat-SemiBold] text-[20px]">
        Camera Permission is disabled.
      </Text>
      <TouchableOpacity
        onPress={onRequestPermission}
        className="flex items-center justify-center mt-5 bg-black p-5 rounded-xl"
      >
        <Text className="text-white font-[Montserrat-SemiBold]">
          Enable Camera Permission
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraNoPermission;
