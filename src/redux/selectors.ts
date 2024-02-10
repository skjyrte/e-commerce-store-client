import {createSelector} from "reselect";
import {RootState} from "./configureStore";
import {useDispatch, useSelector} from "react-redux";

export const selectProductsByCategory = createSelector(
  [
    // Pass input selectors with typed arguments
    (state: RootState) => state.response.value.products,
    (state: RootState, gender: string) => gender,
  ],
  // Extracted values are passed to the result function for recalculation
  (products, gender) => {
    return products.filter((product) => product.gender === gender);
  }
);
