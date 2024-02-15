import {createSlice} from "@reduxjs/toolkit";
import {databaseProducts} from "../../components/Constants/data";
import type {PayloadAction} from "@reduxjs/toolkit";

interface ResponseState {
  value: ResponseObject;
}

type Payload = {
  currentProductId: string | null;
  currentSize: string;
  changeBy: number;
};

const initialState: ResponseState = {value: {...databaseProducts}};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    changeItemsCount: (state, action: PayloadAction<Payload>) => {
      console.log("state.value.products");
      console.log(state.value.products);
      const currentProduct = state.value.products.find(
        (product) => product.id === action.payload.currentProductId
      );

      if (currentProduct !== undefined) {
        const updatedStock = currentProduct.stock.map((sizeObj) =>
          sizeObj.size === action.payload.currentSize
            ? {...sizeObj, count: sizeObj.count - action.payload.changeBy}
            : sizeObj
        );

        const modifiedProducts = state.value.products.map((product) =>
          product.id === action.payload.currentProductId
            ? {...currentProduct, stock: updatedStock}
            : product
        );
        console.log("modifiedProducts");
        console.log(JSON.stringify(modifiedProducts));
        state.value = {...state.value, products: [...modifiedProducts]};
      }
    },
  },
});

export const {changeItemsCount} = responseSlice.actions;

export default responseSlice.reducer;
