import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
