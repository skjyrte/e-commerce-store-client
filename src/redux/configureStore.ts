import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import spinupErrorSlice from "./slices/spinupErrorSlice";
import newCartReducer from "./slices/newCartSlice";

export const store = configureStore({
  reducer: {
    newCart: newCartReducer,
    auth: authReducer,
    spinupError: spinupErrorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
