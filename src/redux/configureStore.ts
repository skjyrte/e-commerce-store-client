import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import spinupErrorReducer from "./slices/spinupErrorSlice";
import newCartReducer from "./slices/newCartSlice";
import apiConnectionReducer from "./slices/apiConnectionSlice";

export const store = configureStore({
  reducer: {
    newCart: newCartReducer,
    auth: authReducer,
    spinupError: spinupErrorReducer,
    apiConnection: apiConnectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
