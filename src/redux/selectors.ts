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
    const results = products.filter((product) => product.id === id);
    console.log(results);
    if (results.length === 0) {
      return undefined;
    }
    if (results.length === 1) {
      return results[0];
    } else {
      throw new Error("invalid database key");
    }
  }
);
