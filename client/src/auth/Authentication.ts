import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem("sessionToken");
    return token;
  } catch (error) {
    console.log("Error while getting token from async storage: ", error);
  }
};
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const error = await axios
    .post("http://192.168.0.103:3001/auth/register", {
      username,
      email,
      password,
    })
    .then(() => console.log("Registered successfully."))
    .catch((error) => error.response.data);

  return error;
};

export const login = async (email: string, password: string) => {
  const error = await axios
    .post("http://192.168.0.103:3001/auth/login", {
      email,
      password,
    })
    .then((response) => {
      AsyncStorage.setItem(
        "sessionToken",
        response.data.authentication.sessionToken
      );
      console.log("Logged in successfully.");
    })
    .catch((error) => error.response.data);

  return error;
};
