import {configureStore} from "@reduxjs/toolkit";
import responseReducer from "./slices/responseSlice";
import selectedGenderReducer from "./slices/selectedGenderSlice";
import selectedProductReducer from "./slices/selectedProductSlice";
import selectedSizeReducer from "./slices/selectedSizeSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import spinupErrorSlice from "./slices/spinupErrorSlice";

export const store = configureStore({
  reducer: {
    response: responseReducer,
    gender: selectedGenderReducer,
    product: selectedProductReducer,
    size: selectedSizeReducer,
    cart: cartReducer,
    auth: authReducer,
    spinupError: spinupErrorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
