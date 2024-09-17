import {createSelector} from "reselect";
import {RootState} from "./configureStore";

export const selectUsers = createSelector(
  (state: RootState) => state.auth.user,
  (state: RootState) => state.auth.guestUser,
  (user, guestUser) => {
    return {user, guestUser};
  }
);

export const selectCountCartItems = createSelector(
  (state: RootState) => state.newCart.items,
  (items) => {
    if (items) {
      return items.reduce((prev, curr) => curr.quantity + prev, 0);
    } else return null;
  }
);

export const selectTotalItemsValue = createSelector(
  (state: RootState) => state.newCart.items,
  (items) => {
    if (items) {
      return items.reduce(
        (prev, curr) => curr.quantity * curr.itemData.price + prev,
        0
      );
    } else return null;
  }
);
