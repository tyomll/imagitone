import { configureStore } from "@reduxjs/toolkit";
import imagitones from "./imagitones/slice";
import users from "./users/slice";

export const store = configureStore({
  reducer: { imagitones, users },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
