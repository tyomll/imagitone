import { View, ActivityIndicator } from "react-native";
import React, { FC, LegacyRef, useEffect, useState } from "react";
import {
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Camera as VisionCamera } from "react-native-vision-camera";
import CameraNoPermission from "./CameraNoPermission";

interface ICamera {
  cameraRef: LegacyRef<VisionCamera>;
}
const Camera: FC<ICamera> = ({ cameraRef }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [c, setC] = useState("#fff");
  const device = useCameraDevice("back");

  const requestCameraPermission = () => {
    if (!hasPermission) {
      setTimeout(() => {
        requestPermission().then(() => {
          setC("#fffff");
          //* Triggers rerender of camera
        });
      }, 300);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View className="w-full h-full flex items-center justify-center">
        <CameraNoPermission onRequestPermission={requestCameraPermission} />
      </View>
    );
  }
  if (!device) {
    return (
      <View className="w-full h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
    <View>
      {device && (
        <VisionCamera
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: c,
            borderRadius: 35,
          }}
          device={device}
          ref={cameraRef}
          photo={true}
          isActive={true}
          onInitialized={() => setC("#ffff")}
          //* Camera is not getting rendered on initialization,
          //* onInitialized function triggers rerender.
        />
      )}
    </View>
  );
};

export default Camera;
