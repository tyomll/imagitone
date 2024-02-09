import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialStateType {
  isAuth: boolean;
}
const initialState: InitialStateType = {
  isAuth: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state: InitialStateType, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    logout(state: InitialStateType) {
      state.isAuth = false;
      AsyncStorage.clear();
    },
  },
});

export const { setIsAuth, logout } = auth.actions;

export default auth.reducer;
