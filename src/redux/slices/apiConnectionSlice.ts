import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface ApiConnectionState {
  isApiOkState: null | boolean;
  loaderState: null | "success" | "error";
}

const initialState: ApiConnectionState = {
  isApiOkState: false,
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

export const preflightConnection = createAsyncThunk<
  boolean,
  void,
  {rejectValue: boolean}
>("ping/pingApiConnection", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();
  const maxRetries = 15;
  let retries = 0;
  let isSuccessful = false;

  const makeRequest = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.get("/ping");
      console.log("PINGING");
      console.log("success", response.data);

      if (isSuccessDatalessResponse(response.data)) {
        const responseObject = response.data;
        if (
          responseObject.success &&
          responseObject.message === "Connection OK"
        ) {
          isSuccessful = true;
          return true;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      retries++;
      if (retries < maxRetries && !isSuccessful) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return makeRequest();
      }

      thunkAPI.rejectWithValue(false);
      return false;
    }
  };

  return await makeRequest();
});

export const apiConnectionSlice = createSlice({
  name: "apiConnection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(preflightConnection.pending, (state) => {
        state.loaderState = null;
        state.isApiOkState = null;
      })
      .addCase(preflightConnection.fulfilled, (state) => {
        state.loaderState = "success";
        state.isApiOkState = true;
      })
      .addCase(preflightConnection.rejected, (state) => {
        state.loaderState = "error";
        state.isApiOkState = false;
      });
  },
});

export const selectApiConnection = (state: RootState) => state.apiConnection;

export default apiConnectionSlice.reducer;
