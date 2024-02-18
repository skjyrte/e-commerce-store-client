import {createSlice} from "@reduxjs/toolkit";
import {databaseProducts} from "../../components/Constants/data";
import type {PayloadAction} from "@reduxjs/toolkit";

interface ResponseState {
  value: ResponseObject;
}

type Payload = {
  id: string | null;
  size: string;
  changeBy: number;
};

const initialState: ResponseState = {value: {...databaseProducts}};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    changeItemsCount: (state, action: PayloadAction<Payload>) => {
      const currentProduct = state.value.products.find(
        (product) => product.id === action.payload.id
      );

      if (currentProduct !== undefined) {
        const updatedStock = currentProduct.stock.map((sizeObj) =>
          sizeObj.size === action.payload.size
            ? {...sizeObj, count: sizeObj.count - action.payload.changeBy}
            : sizeObj
        );

        const modifiedProducts = state.value.products.map((product) =>
          product.id === action.payload.id
            ? {...currentProduct, stock: updatedStock}
            : product
        );
        state.value = {...state.value, products: [...modifiedProducts]};
      }
    },
  },
});

export const {changeItemsCount} = responseSlice.actions;

export default responseSlice.reducer;
