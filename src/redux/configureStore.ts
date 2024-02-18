import {configureStore} from "@reduxjs/toolkit";
import responseReducer from "./counter/responseSlice";
import selectedGenderReducer from "./counter/selectedGenderSlice";
import selectedProductReducer from "./counter/selectedProductSlice";
import selectedSizeReducer from "./counter/selectedSizeSlice";
import cartReducer from "./counter/cartSlice";

export const store = configureStore({
  reducer: {
    response: responseReducer,
    gender: selectedGenderReducer,
    product: selectedProductReducer,
    size: selectedSizeReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
