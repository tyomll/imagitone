import { View } from "react-native";
import React, { FC } from "react";
import Flash from "react-native-vector-icons/Ionicons";
import ToggleCamera from "react-native-vector-icons/FontAwesome5";
import CameraCircle from "../../components/CameraCircle/CameraCircle";

interface ITakePhotoTools {
  onTakePhoto: () => void;
}
const TakePhotoTools: FC<ITakePhotoTools> = ({ onTakePhoto }) => {
  return (
    <View className="w-full flex flex-row items-center justify-around">
      <Flash name="flash" size={35} color="white" />
      <CameraCircle onClick={onTakePhoto} size={90} />
      <ToggleCamera name="sync-alt" size={35} color="white" />
    </View>
  );
};

export default TakePhotoTools;
