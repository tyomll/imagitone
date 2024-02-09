import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuthenticated } from "../auth/Authentication";
import Spinner from "react-native-loading-spinner-overlay";
import { useAppSelector } from "../hooks/useRedux";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuth = await isAuthenticated();
        setIsSignedIn(isAuth);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [isAuth]);

  if (isLoading) {
    return <Spinner visible={true} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhotoCaptureScreen"
              component={PhotoCaptureScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SuggestionsScreen"
              component={SuggestionsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
