import {configureStore} from "@reduxjs/toolkit";
import responseReducer from "./counter/responseSlice";
import selectedGenderReducer from "./counter/selectedGenderSlice";

export const store = configureStore({
  reducer: {
    response: responseReducer,
    gender: selectedGenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
