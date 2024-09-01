import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface AuthState {
  user: BasicUserData | null;
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: false,
};

interface BasicUserData {
  id: string;
  email: string;
  first_name: string;
  second_name: string;
}

type SuccessPayload = BasicUserData;

interface SuccessLoginResponse {
  success: boolean;
  message: string;
  payload: SuccessPayload;
}

function isSuccessLoginResponse(obj: unknown): obj is SuccessLoginResponse {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "success" in obj &&
    typeof obj.success === "boolean" &&
    "message" in obj &&
    typeof obj.message === "string" &&
    "payload" in obj &&
    typeof obj.payload === "object" &&
    obj.payload !== null
  );
}

function isSuccessPayload(obj: unknown): obj is SuccessPayload {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "email" in obj &&
    typeof obj.email === "string" &&
    "first_name" in obj &&
    typeof obj.first_name === "string" &&
    "second_name" in obj &&
    typeof obj.second_name === "string"
  );
}

export const checkAuthStatus = createAsyncThunk<
  SuccessPayload,
  //eslint-disable-next-line
  void,
  {rejectValue: string}
>("auth/checkSession", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();
  try {
    const response = await axiosInstance.get("/auth/check-session", {
      withCredentials: true,
    });
    //eslint-disable-next-line

    if (!isSuccessLoginResponse(response.data))
      throw new Error("Invalid response");
    const payload = response.data.payload;
    console.log(payload);
    if (!isSuccessPayload(payload)) {
      throw new Error("Invalid response");
    }
    return thunkAPI.fulfillWithValue(payload);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      if (!axiosError.response) {
        console.error("Unable to connect with server");
      }
    }
    console.error(err);
    return thunkAPI.rejectWithValue("Unable to log in");
  }
});

export const login = createAsyncThunk<
  BasicUserData,
  {email: string; password: string},
  {rejectValue: string}
>("auth/login", async ({email, password}, thunkAPI) => {
  const axiosInstance = createAxiosInstance();
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      {withCredentials: true}
    );

    if (!isSuccessLoginResponse(response.data))
      throw new Error("Invalid response");
    const payload = response.data.payload;
    console.log(payload);
    if (!isSuccessPayload(payload)) {
      throw new Error("Invalid response");
    }
    return thunkAPI.fulfillWithValue(payload);
  } catch (err: unknown) {
    let errorMessage = "Unexpected error occurred.";
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        errorMessage = "Invalid email or password. Please try again.";
      } else {
        errorMessage = "Unable to log in. Please try again later.";
      }
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: AuthState, action) => {
      state.user = action.payload as BasicUserData | null;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "success";
        state.error = false;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "failed";
        //NOTE for now silent authentication wont produce errors
        state.error = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.error = true;
      });
  },
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
