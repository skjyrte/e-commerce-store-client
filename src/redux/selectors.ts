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

/* export const selectCurrentSize = createSelector(
  [

    (state: RootState) => state.size.value,
    selectCurrentProduct,
  ],

  (size, product) => {
    const defaultSize = product.result?.stock.find((el) => el.count > 0)?.size;
    if (size === null) return defaultSize;
    else return size;
  }
);
 */
