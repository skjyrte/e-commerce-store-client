import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface AuthState {
  user: BasicUserData | null;
  status: "verifyToken" | "loading" | "loggedIn" | "loggedOut" | "failed";
  error: "checkAuth" | "login" | "logout" | null;
}

/* interface NewAuthState {
  user: BasicUserData | null;
  loader: "login" | "logout" | "checkauth" | null;
  verifyToken: "success" | "error" | null;
  login: "success" | "error" | null;
  logout: "success" | "error" | null;
} */

const initialState: AuthState = {
  user: null,
  status: "verifyToken",
  error: null,
};

interface BasicUserData {
  user_id: string;
  email: string;
  first_name: string;
  second_name: string;
  address: string;
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
    "user_id" in obj &&
    typeof obj.user_id === "string" &&
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

export const checkAuthStatus = createAsyncThunk<
  SuccessPayload | null,
  //eslint-disable-next-line
  void,
  {rejectValue: string}
>("auth/checkSession", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();

  try {
    const response = await axiosInstance.get("/auth/check-session", {
      withCredentials: true,
    });

    if (isSuccessLoginResponse(response.data)) {
      const payload = response.data.payload;
      if (isSuccessPayload(payload)) {
        return thunkAPI.fulfillWithValue(payload);
      } else throw new Error("Invalid login payload");
    } else throw new Error("Invalid login response");
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      try {
        await axiosInstance.get("/auth/issue-init-token", {
          withCredentials: true,
        });

        return thunkAPI.fulfillWithValue(null);
      } catch (issueTokenError) {
        console.error("Failed to issue guest token", issueTokenError);
        return thunkAPI.rejectWithValue("Unable to issue guest token");
      }
    } else {
      console.error("Error checking authentication", err);
      return thunkAPI.rejectWithValue("Unable to check authentication status");
    }
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

    if (isSuccessLoginResponse(response.data)) {
      const payload = response.data.payload;
      if (isSuccessPayload(payload)) {
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
    loginSuccess: (state: AuthState, action) => {
      state.user = action.payload as BasicUserData | null;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "loggedIn";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "failed";
        state.error = "checkAuth";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "loggedIn";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.error = "login";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "loggedOut";
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "failed";
        state.error = "logout";
      });
  },
});

export const {loginSuccess, logoutSuccess, clearError} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
