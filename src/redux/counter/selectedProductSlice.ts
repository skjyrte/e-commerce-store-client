import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface productId {
  value: string | undefined;
}

const initialState: productId = {value: undefined};

const selectedProductSlice = createSlice({
  name: "productId",
  initialState,
  reducers: {
    productUpdater: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
    },
    productCleanup: (state) => {
      state.value = undefined;
    },
  },
});

export const {productUpdater, productCleanup} = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
