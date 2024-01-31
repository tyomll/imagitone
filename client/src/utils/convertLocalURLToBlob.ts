import RNFetchBlob from "rn-fetch-blob";

export const convertLocalURLToBlob = (photoPath: string) => {
  const fs = RNFetchBlob.fs;
  let mime = "image/jpg";

  const url = fs
    .readFile(photoPath, "base64")
    .then((data) => {
      let base64Data = `data:${mime};base64,` + data;
      return base64Data;
    })
    .catch((error) => {
      console.error(error);
    });

  return url;
};
