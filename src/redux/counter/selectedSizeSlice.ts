import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface Size {
  value: string | null;
}

type Payload = {
  size: string | null;
  defaultSizeObject: {size: string; count: number} | undefined;
};

const initialState: Size = {value: null};

const selectedSizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    sizeUpdater: (state, action: PayloadAction<Payload>) => {
      if (action.payload.size !== (undefined || null)) {
        state.value = action.payload.size;
      } else if (action.payload.defaultSizeObject !== undefined) {
        state.value = action.payload.defaultSizeObject.size;
      }
    },
    sizeCleanup: (state) => {
      state.value = null;
    },
  },
});

export const {sizeUpdater, sizeCleanup} = selectedSizeSlice.actions;

export default selectedSizeSlice.reducer;
