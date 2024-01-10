import titles from "../constants/takePhotoTitles.json";

export const generateCaptureScreenTitle = () => {
  const titleIndex = Math.floor(Math.random() * titles.length);

  return titles[titleIndex];
};
