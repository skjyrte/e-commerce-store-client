import {createSelector} from "reselect";
import {RootState} from "./configureStore";

export const selectProductsByCategory = createSelector(
  [
    // Pass input selectors with typed arguments
    (state: RootState) => state.response.value.products,
    (state: RootState) => state.gender.value,
  ],
  // Extracted values are passed to the result function for recalculation
  (products, gender) => {
    return products.filter((product) => product.gender === gender);
  }
);

export const selectCurrentProduct = createSelector(
  [
    // Pass input selectors with typed arguments
    (state: RootState) => state.response.value.products,
    (state: RootState) => state.product.value,
  ],
  // Extracted values are passed to the result function for recalculation
  (products, id) => {
    const result = products.find((product) => product.id === id);
    if (result !== undefined) {
      return {result: result, error: null};
    } else {
      return {result: null, error: new Error("Product not found")};
    }
  }
);

export const selectCartItems = createSelector(
  (state: RootState) => state.cart,
  (state: RootState) => state.response.value.products,
  (cart, products) => {
    if (cart.value !== null) {
      const itemCount = cart.value.reduce(
        (accumulator, product) => accumulator + product.count,
        0
      );

      const cartItemsWithResponseData = cart.value.map((product) => {
        const additionalData = products.find(
          (responseProduct) => responseProduct.id === product.id
        );
        if (additionalData !== undefined) {
          return {...product, additionalData: additionalData};
        } else return {...product, additionalData: null};
      });

      return {value: [...cartItemsWithResponseData], itemCount: itemCount};
    } else {
      return {value: null, itemCount: 0};
    }
  }
);
