import {configureStore} from "@reduxjs/toolkit";
import responseReducer from "./slices/responseSlice";
import selectedGenderReducer from "./slices/selectedGenderSlice";
import selectedProductReducer from "./slices/selectedProductSlice";
import selectedSizeReducer from "./slices/selectedSizeSlice";
import cartReducer from "./slices/cartSlice";

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
