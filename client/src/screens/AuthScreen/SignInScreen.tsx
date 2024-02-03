import { View, Text } from "react-native";
import React, { useState } from "react";
import Form from "./Form/Form";

const AuthScreen = () => {
  const [formType, setFormType] = useState<"login" | "register">("register");

  const handleFormTypeChange = () => {
    if (formType === "login") {
      setFormType("register");
    } else {
      setFormType("login");
    }
  };
  return (
    <View
      className="flex flex-col justify-center items-start w-full h-full bg-[#000000] py-12 px-5"
      style={{ gap: 30 }}
    >
      <View style={{ gap: 5 }}>
        <Text className="text-white text-3xl font-[Montserrat-Bold]">
          Welcome {formType === "login" && "Back"}
        </Text>
        <Text className="text-[#c8c8c8] text-lg font-[Montserrat-Light]">
          {formType === "login"
            ? "Enter your details to log in."
            : "Sign up to get started."}
        </Text>
      </View>
      <Form type={formType} />
      <View className="w-full flex flex-row justify-center">
        <Text className="text-[#c8c8c8] text-sm font-[Montserrat-Light]">
          {formType === "login"
            ? "New to Imagitone?"
            : "Already have an account?"}{" "}
          <Text
            className="text-white font-[Montserrat-SemiBold]"
            onPress={handleFormTypeChange}
          >
            {formType === "login" ? "Sign Up" : "Sign In"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;
