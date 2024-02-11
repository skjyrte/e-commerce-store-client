import {configureStore} from "@reduxjs/toolkit";
import responseReducer from "./counter/responseSlice";
import selectedGenderReducer from "./counter/selectedGenderSlice";
import selectedProductSlice from "./counter/selectedProductSlice";

export const store = configureStore({
  reducer: {
    response: responseReducer,
    gender: selectedGenderReducer,
    product: selectedProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
