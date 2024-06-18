import { useEffect } from "react";
import {
  NavigationContainer,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import PhotoCaptureScreen from "../screens/PhotoCaptureScreen/PhotoCaptureScreen";
import SuggestionsScreen from "../screens/SuggestionsScreen/SuggestionsScreen";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe, getSessionToken } from "../redux/users/slice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const users = useAppSelector((state) => state.users);
  const sessionToken = users.sessionToken;

  useEffect(() => {
    dispatch(getSessionToken());
    dispatch(getMe(sessionToken));
  }, [AsyncStorage]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth ? (
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
