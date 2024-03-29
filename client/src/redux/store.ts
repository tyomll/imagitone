import { configureStore } from "@reduxjs/toolkit";
import newImagitone from "./newImagitone/slice";
import auth from "./auth/slice";

export const store = configureStore({
  reducer: { newImagitone, auth },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
