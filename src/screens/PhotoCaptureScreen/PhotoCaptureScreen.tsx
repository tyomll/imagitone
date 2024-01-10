import React, { useRef, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Camera from "../../components/Camera/Camera";
import { takePhoto } from "../../utils/takePhoto";
import { Camera as VisionCamera } from "react-native-vision-camera";
import TakePhotoTools from "./TakePhotoTools";
import PublishPhoto from "./PublishPhoto";

const PhotoCaptureScreen = () => {
  const cameraRef = useRef<VisionCamera>(null);
  const [photoPath, setPhotoPath] = useState("");

  const onTakePhoto = () => {
    const photo = takePhoto(cameraRef);
    photo.then((p) => {
      return setPhotoPath(p);
    });
  };
  return (
    <SafeAreaView
      className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2"
      style={{ gap: 50 }}
    >
      <Text
        className="ml-[10px] text-2xl text-white font-[Montserrat-Bold]"

        // TODO: Add random text like - I feel it would be great imagination, etc...
      >
        Make something cool!!!
      </Text>

      <View className="w-full h-[60vh] bg-[#ffffff6f] rounded-xl overflow-hidden">
        {photoPath ? (
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: "file://" + photoPath }}
          />
        ) : (
          <Camera cameraRef={cameraRef} />
        )}
      </View>
      {photoPath ? (
        <PublishPhoto />
      ) : (
        <TakePhotoTools onTakePhoto={onTakePhoto} />
      )}
    </SafeAreaView>
  );
};

export default PhotoCaptureScreen;
