import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface ApiConnectionState {
  loaderState: null | "success" | "error";
}

const initialState: ApiConnectionState = {
  loaderState: null,
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
    const axiosInstance = createAxiosInstance();
    const maxRetries = 15;

    const makeRequest = async (retries = 0): Promise<void> => {
      try {
        console.log("ping request");
        const response = await axiosInstance.get("/ping");

        if (isSuccessDatalessResponse(response.data)) {
          const responseObject = response.data;
          if (
            responseObject.success &&
            responseObject.message === "Connection OK"
          ) {
            thunkAPI.fulfillWithValue(true);
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
          return makeRequest(retries++);
        }

        thunkAPI.rejectWithValue(false);
      }
    };

    return makeRequest();
  }
);

export const apiConnectionSlice = createSlice({
  name: "apiConnection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(preflightConnection.pending, (state) => {
        state.loaderState = null;
      })
      .addCase(preflightConnection.fulfilled, (state) => {
        state.loaderState = "success";
      })
      .addCase(preflightConnection.rejected, (state) => {
        state.loaderState = "error";
      });
  },
});

export const selectApiConnection = (state: RootState) => state.apiConnection;

export default apiConnectionSlice.reducer;
