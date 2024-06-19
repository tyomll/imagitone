import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Imagitone } from "../../types/common/Imagitone";
import { HfInference } from "@huggingface/inference";
import {
  generateSuggestionsApi,
  postImagitoneApi,
  getImagitionesApi,
} from "../../api";
import { RootState } from "../store";

export interface InitialStateType {
  newImagitone: Imagitone | null;
  imagitones: Imagitone[];
}
const initialState: InitialStateType = {
  newImagitone: null,
  imagitones: [],
};

export const generateSuggestions = createAsyncThunk(
  "imagitones/generateSuggestions",
  async (payload: { inference: HfInference; photoPath: string }) => {
    const { inference, photoPath } = payload;
    const suggestions = await generateSuggestionsApi(inference, photoPath);

    return suggestions;
  }
);

export const postImagitone = createAsyncThunk(
  "imagitones/postImagitone",
  async (newImagitone: Imagitone, { getState }) => {
    const state = getState() as RootState;
    const user = state.users.user;
    await postImagitoneApi(user, newImagitone);
  }
);

export const getImagitones = createAsyncThunk(
  "imagitones/getImagitones",
  async () => {
    const response = await getImagitionesApi();
    return { imagitones: response.data };
  }
);

const Imagitones = createSlice({
  name: "imagitones",
  initialState,
  reducers: {
    setNewImagtione(state: InitialStateType, action: PayloadAction<Imagitone>) {
      state.newImagitone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getImagitones.fulfilled, (state, action) => {
      const { imagitones } = action.payload;
      state.imagitones = imagitones;
    });
  },
});

export const { setNewImagtione } = Imagitones.actions;

export default Imagitones.reducer;
