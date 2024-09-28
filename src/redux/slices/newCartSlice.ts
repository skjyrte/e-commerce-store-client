import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../configureStore";
import createAxiosInstance from "../../api/createAxiosInstance";

interface CartProductItem {
  id: string;
  size: string;
  quantity: number;
  itemData: ItemData;
}

interface CartState {
  items: CartProductItem[] | null;
  loaderState: "getItems" | "addToCart" | "deleteCartItem" | null;
}
const initialState: CartState = {items: null, loaderState: null};

interface ItemData {
  brand: string;
  model: string;
  gender: string;
  price: number;
  thumbnail: string;
  max_order: number;
}

interface CartDatabase {
  product_id: string;
  product_size: string;
  cart_quantity: number;
  item_data: ItemData;
}

interface SuccessDataResponse {
  success: boolean;
  message: string;
  payload: unknown;
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

function isItemData(obj: unknown): obj is ItemData {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "brand" in obj &&
    typeof obj.brand === "string" &&
    "model" in obj &&
    typeof obj.model === "string" &&
    "gender" in obj &&
    typeof obj.gender === "string" &&
    "price" in obj &&
    typeof obj.price === "number" &&
    "thumbnail" in obj &&
    typeof obj.thumbnail === "string" &&
    "max_order" in obj &&
    typeof obj.max_order === "number"
  );
}

function isCartDatabase(obj: unknown): obj is CartDatabase {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "product_id" in obj &&
    typeof obj.product_id === "string" &&
    "product_size" in obj &&
    typeof obj.product_size === "string" &&
    "cart_quantity" in obj &&
    typeof obj.cart_quantity === "number" &&
    "item_data" in obj &&
    typeof obj.item_data === "object" &&
    isItemData(obj.item_data)
  );
}

function isArrayOfCartItems(variable: unknown): variable is CartDatabase[] {
  return (
    Array.isArray(variable) &&
    variable.every(
      (obj) => obj !== null && typeof obj === "object" && isCartDatabase(obj)
    )
  );
}

export const getCartItems = createAsyncThunk<
  CartProductItem[] | null,
  //eslint-disable-next-line
  void,
  {rejectValue: string}
>("newCart/getCartItems", async (_, thunkAPI) => {
  const axiosInstance = createAxiosInstance();

  try {
    const response = await axiosInstance.get("/cart/get-items", {
      withCredentials: true,
    });

    if (isSuccessDataResponse(response.data)) {
      const payload = response.data.payload;

      if (
        typeof payload === "object" &&
        Array.isArray(payload) &&
        payload.length === 0
      ) {
        return thunkAPI.fulfillWithValue(null);
      }
      if (typeof payload === "object" && isArrayOfCartItems(payload)) {
        console.log(payload);
        return thunkAPI.fulfillWithValue(
          payload.map((obj) => ({
            id: obj.product_id,
            size: obj.product_size,
            quantity: obj.cart_quantity,
            itemData: obj.item_data,
          }))
        );
      } else {
        return thunkAPI.rejectWithValue("Invalid cart payload");
      }
    } else {
      return thunkAPI.rejectWithValue("Invalid response");
    }
  } catch (err: unknown) {
    console.error("GET cart error", err);
    return thunkAPI.rejectWithValue("Error getting cart contents");
  }
});

export const addToCart = createAsyncThunk<
  CartProductItem,
  //eslint-disable-next-line
  {product_id: string; product_size: string; cart_quantity: number},
  {rejectValue: string}
>(
  "newCart/addToCart",
  async ({product_id, product_size, cart_quantity}, thunkAPI) => {
    const axiosInstance = createAxiosInstance();

    try {
      const response = await axiosInstance.post(
        "/cart/add-item",
        {product_id, product_size, cart_quantity},
        {
          withCredentials: true,
        }
      );

      if (isSuccessDataResponse(response.data)) {
        const payload = response.data.payload;
        if (typeof payload === "object" && isCartDatabase(payload)) {
          return thunkAPI.fulfillWithValue({
            id: payload.product_id,
            size: payload.product_size,
            quantity: payload.cart_quantity,
            itemData: payload.item_data,
          });
        } else {
          return thunkAPI.rejectWithValue("Invalid cart payload");
        }
      } else {
        return thunkAPI.rejectWithValue("Invalid response");
      }
    } catch (err: unknown) {
      console.error("GET cart error", err);
      return thunkAPI.rejectWithValue("Error getting cart contents");
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  {id: string; size: string; quantity: 0},
  {product_id: string; product_size: string},
  {rejectValue: string}
>("newCart/deleteItem", async ({product_id, product_size}, thunkAPI) => {
  const axiosInstance = createAxiosInstance();

  try {
    const response = await axiosInstance.delete("/cart/delete-item", {
      params: {product_id, product_size},
      withCredentials: true,
    });

    if (isSuccessDatalessResponse(response.data)) {
      return thunkAPI.fulfillWithValue({
        id: product_id,
        size: product_size,
        quantity: 0,
      });
    } else {
      throw new Error("ABCD");
    }
  } catch (err: unknown) {
    console.error("DELETE cart error", err);
    return thunkAPI.rejectWithValue("Error DELETE item");
  }
});

function updateCartItem(state: CartState, payload: CartProductItem) {
  if (state.items) {
    const existingProduct = state.items.find(
      (product) => product.id === payload.id && product.size === payload.size
    );

    if (existingProduct) {
      state.items = state.items.map((product) =>
        product.id === payload.id && product.size === payload.size
          ? {...product, quantity: payload.quantity}
          : product
      );
    } else {
      state.items = [...state.items, {...payload}];
    }
    state.items = state.items.filter((product) => product.quantity !== 0);
    state.items = state.items.length === 0 ? null : state.items;
  } else {
    state.items = [{...payload}];
  }
}

function onSuccessDelete(
  state: CartState,
  payload: {id: string; size: string; quantity: 0}
) {
  if (state.items) {
    const existingProduct = state.items.find(
      (product) => product.id === payload.id && product.size === payload.size
    );

    if (existingProduct) {
      state.items = state.items.map((product) =>
        product.id === payload.id && product.size === payload.size
          ? {...product, quantity: payload.quantity}
          : product
      );
    } else {
      return;
    }
    state.items = state.items.filter((product) => product.quantity !== 0);
    state.items = state.items.length === 0 ? null : state.items;
  } else {
    return;
  }
}

const newCartSlice = createSlice({
  name: "newCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loaderState = "getItems";
        state.items = null;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.loaderState = null;
        state.items = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loaderState = null;
        state.items = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loaderState = "addToCart";
      })
      .addCase(addToCart.rejected, (state) => {
        state.loaderState = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loaderState = null;
        updateCartItem(state, action.payload);
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loaderState = "deleteCartItem";
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.loaderState = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loaderState = null;
        onSuccessDelete(state, action.payload);
      });
  },
});

export default newCartSlice.reducer;

export const selectNewCart = (state: RootState) => state.newCart;
