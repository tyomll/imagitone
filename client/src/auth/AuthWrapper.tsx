import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack } from "../navigation/stack";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";
import { isAuthenticated } from "./Authentication";

const AuthWrapper = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const isAuth = await isAuthenticated();
      if (isAuth) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
      setIsLoading(false);
    })();
  }, [AsyncStorage, isSignedIn]);

  if (isLoading) {
    return <Spinner visible={true} />;
  }

  return (
    <>
      {!isSignedIn ? (
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
