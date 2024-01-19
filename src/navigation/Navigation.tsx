import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import { Stack } from "./stack";
import { navigationRef } from "./navigate";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
