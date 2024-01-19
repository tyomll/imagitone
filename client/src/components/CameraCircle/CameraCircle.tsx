import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

interface ICameraCircle {
  onClick: () => void;
  size: number;
}
const CameraCircle: FC<ICameraCircle> = ({ onClick, size }) => {
  return (
    <Icon name="circle-thin" size={size} color="white" onPress={onClick} />
  );
};

export default CameraCircle;
