import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IImagitone } from "../../types/common/Imagitone";

export interface InitialStateType {
  newImagitone: IImagitone | undefined;
}
const initialState: InitialStateType = {
  newImagitone: undefined,
};

const newImagitone = createSlice({
  name: "newImagitone",
  initialState,
  reducers: {
    setNewImagtione(
      state: InitialStateType,
      action: PayloadAction<IImagitone>
    ) {
      state.newImagitone = action.payload;
    },
  },
});

export const { setNewImagtione } = newImagitone.actions;

export default newImagitone.reducer;
