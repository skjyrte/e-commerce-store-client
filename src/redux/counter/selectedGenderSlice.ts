import {createSlice} from "@reduxjs/toolkit";

interface selectedGender {
  value: string | null;
}

const initialState: selectedGender = {value: null};

const selectedGenderSlice = createSlice({
  name: "selectedGender",
  initialState,
  reducers: {
    switchMen: (state) => {
      state.value = "men";
    },
    switchWomen: (state) => {
      state.value = "women";
    },
  },
});

export const {switchMen, switchWomen} = selectedGenderSlice.actions;

export default selectedGenderSlice.reducer;
