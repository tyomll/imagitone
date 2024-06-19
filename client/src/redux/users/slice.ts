import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/common/User";
import { getMeApi, loginApi, registerApi } from "../../api";
import { isEmpty } from "lodash-es";

export interface InitialStateType {
  isAuth: boolean;
  user: User;
  sessionToken: string;
}
const initialState: InitialStateType = {
  isAuth: false,
  user: { avatar: "", id: "", username: "", email: "" },
  sessionToken: "",
};

export const getMe = createAsyncThunk(
  "users/getMe",
  async (sessionToken: string) => {
    const response = await getMeApi(sessionToken);
    return { me: response.data };
  }
);
export const getSessionToken = createAsyncThunk(
  "users/getSessionToken",
  async () => {
    const token = (await AsyncStorage.getItem("sessionToken")) || "";
    return { token };
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = payload;

    const response = await loginApi(email, password);
    const data = response.data;
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      sessionToken: data.authentication.sessionToken,
    };
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (
    payload: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    const { username, email, password } = payload;
    try {
      const response = await registerApi(username, email, password);
      const data = response.data;
      return {
        id: data.id,
        email: data.email,
        username: data.username,
        sessionToken: data.authentication.sessionToken,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const users = createSlice({
  name: "users",
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
  extraReducers: (builder) => {
    builder
      .addCase(getSessionToken.fulfilled, (state, action) => {
        const { token } = action.payload;
        if (token) {
          state.sessionToken = token;
          AsyncStorage.setItem("sessionToken", token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        throw action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { id, email, username, sessionToken } = action.payload;
        state.user = { ...state.user, id, email, username };
        state.isAuth = true;

        if (sessionToken) {
          AsyncStorage.setItem("sessionToken", sessionToken);
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        const { id, email, username, sessionToken } = action.payload;
        state.user = { ...state.user, id, email, username };
        state.isAuth = true;

        if (sessionToken) {
          AsyncStorage.setItem("sessionToken", sessionToken);
        }
      })
      .addCase(getMe.fulfilled, (state, action) => {
        const { me } = action.payload;
        if (!isEmpty(me)) {
          state.user = me;
          state.isAuth = true;
        } else {
          state.isAuth = false;
        }
      });
  },
});

export const { setIsAuth, logout } = users.actions;

export default users.reducer;
