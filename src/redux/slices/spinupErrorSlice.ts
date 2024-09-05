import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../configureStore";

interface SpinupErrorState {
  error: boolean;
}

const initialState: SpinupErrorState = {
  error: false,
};

export const spinupErrorSlice = createSlice({
  name: "spinupError",
  initialState,
  reducers: {
    setSpinupError: (state) => {
      state.error = true;
    },
    clearSpinupError: (state) => {
      state.error = false;
    },
  },
});

export const {setSpinupError, clearSpinupError} = spinupErrorSlice.actions;

export const selectSpinupError = (state: RootState) => state.spinupError;

export default spinupErrorSlice.reducer;
