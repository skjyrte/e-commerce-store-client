import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface selectedGender {
  value: "men" | "women" | null;
}

const initialState: selectedGender = {value: null};

const selectedGenderSlice = createSlice({
  name: "selectedGender",
  initialState,
  reducers: {
    switchGender: (state, action: PayloadAction<"men" | "women">) => {
      state.value = action.payload;
    },
  },
});

export const {switchGender} = selectedGenderSlice.actions;

export default selectedGenderSlice.reducer;
