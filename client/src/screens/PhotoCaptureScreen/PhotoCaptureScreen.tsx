import React, { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Camera from "../../components/Camera/Camera";
import { takePhoto } from "../../utils/takePhoto";
import { Camera as VisionCamera } from "react-native-vision-camera";
import TakePhotoTools from "./TakePhotoTools";
import SavePhoto from "./SavePhoto";
import { generateCaptureScreenTitle } from "../../utils/generateCaptureScreenTitle";

const PhotoCaptureScreen = () => {
  const cameraRef = useRef<VisionCamera>(null);
  const [photoPath, setPhotoPath] = useState<string>("");
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [cameraPosition, setCameraPosition] = useState<"back" | "front">(
    "back"
  );
  const [title, setTitle] = useState<string>("");

  const toggleFlash = () => {
    if (flash === "off") {
      setFlash("on");
    } else {
      setFlash("off");
    }
  };
  const toggleCameraPosition = () => {
    if (cameraPosition === "back") {
      setCameraPosition("front");
    } else {
      setCameraPosition("back");
    }
  };
  const onTakePhoto = () => {
    const photo = takePhoto(cameraRef);
    photo.then((p) => {
      return setPhotoPath(p);
    });
  };

  useEffect(() => {
    setTitle(generateCaptureScreenTitle());
  }, []);

  return (
    <SafeAreaView
      className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2"
      style={{ gap: 50 }}
    >
      <Text className="ml-[10px] text-2xl text-white font-[Montserrat-Bold]">
        {photoPath ? "Save to get started" : title}
      </Text>

      <View className="w-full h-[60vh] bg-[#ffffff6f] rounded-xl overflow-hidden">
        {photoPath ? (
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: "file://" + photoPath }}
          />
        ) : (
          <Camera
            cameraRef={cameraRef}
            flash={flash}
            cameraPosition={cameraPosition}
          />
        )}
      </View>
      {photoPath ? (
        <SavePhoto
          photoPath={photoPath}
          onDiscardPhoto={() => setPhotoPath("")}
        />
      ) : (
        <TakePhotoTools
          flash={flash}
          onTakePhoto={onTakePhoto}
          toggleFlash={toggleFlash}
          toggleCameraPosition={toggleCameraPosition}
        />
      )}
    </SafeAreaView>
  );
};

export default PhotoCaptureScreen;
