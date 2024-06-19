import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface productId {
  value: string | null;
}

const initialState: productId = {value: null};

const selectedProductSlice = createSlice({
  name: "productId",
  initialState,
  reducers: {
    productUpdater: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
    productCleanup: (state) => {
      state.value = null;
    },
  },
});

export const {productUpdater, productCleanup} = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
