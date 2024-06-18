import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack } from "../navigation/stack";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";
import { validateTokenApi } from "../api/index";
import { useAppSelector } from "../hooks/useRedux";

const AuthWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useAppSelector((state) => state.users.isAuth);

  if (isLoading) {
    return <Spinner visible={true} />;
  }

  return (
    <>
      {!isAuth ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhotoCaptureScreen"
            component={PhotoCaptureScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SuggestionsScreen"
            component={SuggestionsScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </>
  );
};

export default AuthWrapper;
