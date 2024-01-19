export const takePhoto = async (cameraRef: any) => {
  if (cameraRef.current !== null) {
    const photo = await cameraRef.current.takePhoto({});
    return photo.path;
  }
};
