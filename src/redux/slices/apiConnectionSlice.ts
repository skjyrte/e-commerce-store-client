import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../configureStore";
import {createShortTimeoutAxiosInstance} from "../../api/createAxiosInstance";

interface ApiConnectionState {
  loaderState: null | "success" | "error";
  pingState: null | "success" | "error";
}

const initialState: ApiConnectionState = {
  loaderState: null,
  pingState: null,
};

interface SuccessDatalessResponse {
  success: boolean;
  message: string;
  payload: unknown;
}

function isSuccessDatalessResponse(
  obj: unknown
): obj is SuccessDatalessResponse {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "success" in obj &&
    typeof obj.success === "boolean" &&
    "message" in obj &&
    typeof obj.message === "string" &&
    !("payload" in obj)
  );
}

export const preflightConnection = createAsyncThunk(
  "ping/pingApiConnection",
  async (_, thunkAPI) => {
    const axiosInstance = createShortTimeoutAxiosInstance();
    const maxRetries = 10;

    const makeRequest = async (retries = 0): Promise<string> => {
      try {
        console.log("ping request");
        const response = await axiosInstance.get("/ping");

        if (isSuccessDatalessResponse(response.data)) {
          const responseObject = response.data;
          if (
            responseObject.success &&
            responseObject.message === "Connection OK"
          ) {
            return "Request fulfilled";
          } else {
            throw new Error("Invalid response");
          }
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        retries++;
        if (retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return makeRequest(retries);
        }
        return Promise.reject(new Error("Connection timeout"));
      }
    };

    try {
      const result = await makeRequest();
      return thunkAPI.fulfillWithValue(result);
    } catch (err) {
      return thunkAPI.rejectWithValue("Connection timeout");
    }
  }
);

export const apiConnectionSlice = createSlice({
  name: "apiConnection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(preflightConnection.pending, (state) => {
        if (state.loaderState !== "success") {
          state.loaderState = null;
        } else {
          state.pingState = null;
        }
      })
      .addCase(preflightConnection.fulfilled, (state) => {
        if (state.loaderState !== "success") {
          state.loaderState = "success";
        } else {
          state.pingState = "success";
        }
      })
      .addCase(preflightConnection.rejected, (state) => {
        if (state.loaderState !== "success") {
          state.loaderState = "error";
        } else {
          state.pingState = "error";
        }
      });
  },
});

export const selectApiConnection = (state: RootState) => state.apiConnection;

export default apiConnectionSlice.reducer;
