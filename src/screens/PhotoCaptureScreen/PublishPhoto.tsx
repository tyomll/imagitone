import { View, Text, TouchableOpacity } from "react-native";
import Publish from "react-native-vector-icons/MaterialIcons";

const PublishPhoto = () => {
  const onPublish = () => {
    // TODO: Implement publish function
  };
  return (
    <TouchableOpacity
      className="flex flex-row items-center"
      style={{ gap: 5 }}
      onPress={onPublish}
    >
      <Text className="text-white text-[30px] font-[Montserrat-Bold] tracking-tighter">
        Publish
      </Text>
      <Publish name="send" size={50} color="white" />
    </TouchableOpacity>
  );
};

export default PublishPhoto;
