import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";
import AuthScreen from "../screens/AuthScreen/SignInScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuthenticated } from "../auth/Authentication";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await isAuthenticated();
      if (token) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    })();
  }, [AsyncStorage, isSignedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
