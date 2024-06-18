import { View, ImageBackground } from "react-native";
import React, { FC } from "react";

interface IUserAvatar {
  avatarUrl?: string;
  size: number;
  borderRadius: number | "full";
  ring: boolean;
}
const UserAvatar: FC<IUserAvatar> = ({
  avatarUrl,
  size,
  borderRadius,
  ring,
}) => {
  const radius: number = borderRadius === "full" ? 100 : borderRadius;

  return (
    <View
      className={ring ? "p-1 rounded-full border-[#f8eee078] border-2" : ""}
    >
      <ImageBackground
        source={{
          uri:
            avatarUrl ||
            "https://firebasestorage.googleapis.com/v0/b/social-media-c7b8a.appspot.com/o/userAvatars%2FsJIDXHbHYtgkxnNuSvqTZnPLz4d2.png?alt=media&token=63376033-3f6c-4840-b5ff-1215f1da787b",
        }}
        style={{ width: size, height: size }}
        imageStyle={{
          borderRadius: radius,
        }}
      />
    </View>
  );
};

export default UserAvatar;
