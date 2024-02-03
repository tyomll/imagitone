import axios from "axios";

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
    .then(() => console.log("Logged in successfully."))
    .catch((error) => error.response.data);

  return error;
};

export const login = async (email: string, password: string) => {
  const error = await axios
    .post("http://192.168.0.103:3001/auth/login", {
      email,
      password,
    })
    .then(() => console.log("Logged in successfully."))
    .catch((error) => error.response.data);

  return error;
};
