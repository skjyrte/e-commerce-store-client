import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

type CartProductEntry = {
  id: string;
  size: string;
  count: number;
};

type cartState = {
  value: CartProductEntry[] | null;
};

type Payload = {
  id: string;
  size: string;
  changeBy: number;
};

const initialState: cartState = {value: null};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Payload>) => {
      if (state.value !== null) {
        const existingProduct = state.value.find(
          (product) =>
            product.id === action.payload.id &&
            product.size === action.payload.size
        );
        //modify existing product
        if (existingProduct) {
          state.value = state.value.map((product) => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                count: product.count + action.payload.changeBy,
              };
            } else return product;
          });
        } else {
          //add product
          state.value = [
            ...state.value,
            {
              id: action.payload.id,
              size: action.payload.size,
              count: action.payload.changeBy,
            },
          ];
        }
        //filter empty objects
        state.value = state.value.filter((product) => product.count !== 0);
        //if empty, set to null
        state.value = state.value.length === 0 ? null : state.value;
      } else {
        state.value = [
          {
            id: action.payload.id,
            size: action.payload.size,
            count: action.payload.changeBy,
          },
        ];
        return;
      }
    },
  },
});

export default cartSlice.reducer;

export const {addToCart} = cartSlice.actions;
