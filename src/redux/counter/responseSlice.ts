import {createSlice} from "@reduxjs/toolkit";
import {databaseProducts} from "../../components/Constants/data";

interface ResponseState {
  value: ResponseObject;
}

const initialState: ResponseState = {value: {...databaseProducts}};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {},
});

export default responseSlice.reducer;
