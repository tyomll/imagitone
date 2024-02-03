const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validateUsername = (username: string) => {
  return String(username)
    .toLowerCase()
    .match(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{7,}$/);
};

const validatePassword = (password: string) => {
  return String(password)
    .toLowerCase()
    .match(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{7,}$/);
};

export const validateAuthDetails = (
  username: string,
  email: string,
  password: string,
  type: "login" | "register"
) => {
  if (type === "register" && !validateUsername(username)) {
    return "Invalid username.";
  }
  if (!validateEmail(email)) {
    return "Invalid email.";
  }
  if (!validatePassword(password)) {
    return "Invalid password.";
  }
};
