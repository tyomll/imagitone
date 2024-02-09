import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ImaginationsList from "../../components/ImaginationsList/ImaginationsList";
import Stories from "../../components/Stories";
import CameraCircle from "../../components/CameraCircle/CameraCircle";
import { NavigationProp } from "@react-navigation/native";
import Header from "./Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../hooks/useRedux";
import { logout } from "../../redux/auth/slice";

const HomeScreen: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex flex-col items-center w-full h-full bg-[#000000] py-12 px-2">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="flex flex-col w-full"
      >
        <Header />
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text className="text-white">Log out</Text>
        </TouchableOpacity>
        <Stories />
        <ImaginationsList />
      </ScrollView>
      <View className="flex flex-row justify-center absolute w-full bottom-[1px] ">
        <CameraCircle
          onClick={() => navigation.navigate("PhotoCaptureScreen")}
          size={100}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
