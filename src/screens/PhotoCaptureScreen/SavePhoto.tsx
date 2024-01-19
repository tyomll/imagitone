import { TouchableOpacity, View } from "react-native";
import Check from "react-native-vector-icons/Octicons";
import Back from "react-native-vector-icons/MaterialIcons";
import { FC } from "react";
import { navigate } from "../../navigation/navigate";

interface ISavePhoto {
  onDiscardPhoto: () => void;
}
const SavePhoto: FC<ISavePhoto> = ({ onDiscardPhoto }) => {
  const onSave = () => {
    navigate("SuggestionsScreen");
  };
  const onBack = () => {
    onDiscardPhoto();
  };
  return (
    <View className="w-full flex flex-row items-start justify-around ">
      <TouchableOpacity onPress={onBack} className="mt-[15px]">
        <Back name="arrow-back-ios" size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave}>
        <Check name="check-circle-fill" size={70} color="white" />
        <View className="w-[30px] h-[60px]"></View>
      </TouchableOpacity>
      <View className="w-[30px]"></View>
    </View>
  );
};

export default SavePhoto;
