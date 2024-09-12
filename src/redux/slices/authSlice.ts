import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface NewAuthState {
  user: BasicUserData | null;
  guestUser: GuestUserData | null;
  loaderState:
    | "login"
    | "logout"
    | "validateUserToken"
    | "validateGuestToken"
    | null;
  validateUserTokenState: "success" | "error" | null;
  validateGuestTokenState: "success" | "error" | null;
  loginState: "success" | "error" | null;
  logoutState: "success" | "error" | null;
}

const initialState: NewAuthState = {
  user: null,
  guestUser: null,
  loaderState: null,
  validateUserTokenState: null,
  validateGuestTokenState: null,
  loginState: null,
  logoutState: null,
};

interface BasicUserData {
  user_id: string;
  guest: false;
  email: string;
  first_name: string;
  second_name: string;
  address: string;
}

interface GuestUserData {
  user_id: string;
  guest: true;
}

interface SuccessDataResponse {
  success: boolean;
  message: string;
  payload: BasicUserData;
}

function isSuccessDataResponse(obj: unknown): obj is SuccessDataResponse {
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

function isBasicUserData(obj: unknown): obj is BasicUserData {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "user_id" in obj &&
    typeof obj.user_id === "string" &&
    "guest" in obj &&
    obj.guest === false &&
    "email" in obj &&
    typeof obj.email === "string" &&
    "first_name" in obj &&
    typeof obj.first_name === "string" &&
    "second_name" in obj &&
    typeof obj.second_name === "string" &&
    "address" in obj &&
    typeof obj.address === "string"
  );
}

function isGuestUserData(obj: unknown): obj is GuestUserData {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "user_id" in obj &&
    typeof obj.user_id === "string" &&
    "guest" in obj &&
    obj.guest === true
  );
}

export const validateUserToken = createAsyncThunk<
  BasicUserData | null,
  //eslint-disable-next-line
  void,
  {rejectValue: string}
>("auth/validateUserToken", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();

  try {
    const response = await axiosInstance.get("/auth/validate-user-token", {
      withCredentials: true,
    });

    if (isSuccessDataResponse(response.data)) {
      const payload = response.data.payload;
      if (isBasicUserData(payload)) {
        return thunkAPI.fulfillWithValue(payload);
      } else throw new Error("Invalid login payload");
    } else throw new Error("Invalid login response");
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return thunkAPI.rejectWithValue("User not authorized");
    }
    console.error("Error checking authentication", err);
    return thunkAPI.rejectWithValue("Unable to check authentication status");
  }
});

export const validateGuestToken = createAsyncThunk<
  GuestUserData | null,
  //eslint-disable-next-line
  void,
  {rejectValue: string}
>("auth/validateGuestToken", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();

  try {
    const response = await axiosInstance.get("/auth/validate-guest-token", {
      withCredentials: true,
    });

    if (isSuccessDataResponse(response.data)) {
      const payload = response.data.payload;
      if (isGuestUserData(payload)) {
        return thunkAPI.fulfillWithValue(payload);
      } else throw new Error("Invalid login payload");
    } else throw new Error("Invalid login response");
  } catch (err: unknown) {
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 ||
        err.response?.status === 400 ||
        err.response?.status === 403)
    ) {
      try {
        const response = await axiosInstance.post(
          "/auth/register-guest-token",
          {
            withCredentials: true,
          }
        );
        if (isSuccessDataResponse(response.data)) {
          const payload = response.data.payload;
          if (isGuestUserData(payload)) {
            return thunkAPI.fulfillWithValue(payload);
          } else throw new Error("Invalid login payload");
        } else throw new Error("Invalid login response");
      } catch (issueTokenError) {
        console.error("Failed to issue guest token", issueTokenError);
        return thunkAPI.rejectWithValue("Unable to register guest token");
      }
    }

    console.error("Failed to validate guest token", err);
    return thunkAPI.rejectWithValue("Unable to validate guest token");
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
      {email, password},
      {withCredentials: true}
    );

    if (isSuccessDataResponse(response.data)) {
      const payload = response.data.payload;
      if (isBasicUserData(payload)) {
        return thunkAPI.fulfillWithValue(payload);
      }
    }
    throw new Error("Invalid response");
  } catch (err: unknown) {
    let errorMessage = "Unexpected error occurred.";
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else {
        errorMessage = "Unable to log in. Please try again later.";
      }
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();
  try {
    await axiosInstance.post("/auth/logout", {}, {withCredentials: true});
    return thunkAPI.fulfillWithValue(null);
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue("Unexpected error");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: NewAuthState, action) => {
      state.user = action.payload as BasicUserData;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    clearState: (state, action) => {
      const keyState = action.payload as
        | "user"
        | "guestUser"
        | "loaderState"
        | "validateUserTokenState"
        | "validateGuestTokenState"
        | "loginState"
        | "logoutState";
      state[keyState] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUserToken.pending, (state) => {
        state.loaderState = "validateUserToken";
        state.validateUserTokenState = null;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        state.loaderState = null;
        state.validateUserTokenState = "success";
        state.user = action.payload;
        state.logoutState = null;
      })
      .addCase(validateUserToken.rejected, (state) => {
        state.loaderState = null;
        state.validateUserTokenState = "error";
      })
      .addCase(validateGuestToken.pending, (state) => {
        state.loaderState = "validateGuestToken";
        state.validateGuestTokenState = null;
      })
      .addCase(validateGuestToken.fulfilled, (state, action) => {
        state.loaderState = null;
        state.validateGuestTokenState = "success";
        state.guestUser = action.payload;
      })
      .addCase(validateGuestToken.rejected, (state) => {
        state.loaderState = null;
        state.validateGuestTokenState = "error";
      })
      .addCase(login.pending, (state) => {
        state.loaderState = "login";
        state.loginState = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loaderState = null;
        state.loginState = "success";
        state.user = action.payload;
        state.validateUserTokenState = "success";
        state.logoutState = null;
      })
      .addCase(login.rejected, (state) => {
        state.loaderState = null;
        state.loginState = "error";
      })
      .addCase(logout.pending, (state) => {
        state.loaderState = "logout";
        state.logoutState = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.guestUser = null;
        state.loaderState = null;
        state.validateUserTokenState = null;
        state.validateGuestTokenState = null;
        state.loginState = null;
        state.logoutState = "success";
      })
      .addCase(logout.rejected, (state) => {
        state.loaderState = null;
        state.logoutState = "error";
      });
  },
});

export const {loginSuccess, logoutSuccess, clearState} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
