import { configureStore } from "@reduxjs/toolkit";
import newImagitone from "./newImagitone/slice";

export const store = configureStore({
  reducer: { newImagitone },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
