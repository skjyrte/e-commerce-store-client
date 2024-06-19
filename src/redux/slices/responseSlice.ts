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
        const updatedStock = currentProduct.stock.map((sizeObj) => {
          if (sizeObj.size === action.payload.size) {
            try {
              if (sizeObj.count - action.payload.changeBy >= 0) {
                return {
                  ...sizeObj,
                  count: sizeObj.count - action.payload.changeBy,
                };
              } else {
                throw new Error(
                  "user requests more items than in present in stock"
                );
              }
            } catch (e) {
              console.error(e);
              return sizeObj;
            }
          } else {
            return sizeObj;
          }
        });

        const modifiedProducts = state.value.products.map((product) =>
          product.id === action.payload.id
            ? {...currentProduct, stock: updatedStock}
            : product
        );
        state.value = {...state.value, products: [...modifiedProducts]};
      } else {
        throw new Error("no such product in database");
      }
    },
  },
});

export const {changeItemsCount} = responseSlice.actions;

export default responseSlice.reducer;
