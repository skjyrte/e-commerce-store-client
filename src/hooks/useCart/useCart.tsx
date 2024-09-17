import {useDispatch, useSelector} from "react-redux";
import {
  getCartItems,
  addToCart,
  selectNewCart,
  deleteCartItem,
} from "../../redux/slices/newCartSlice";
import {AppDispatch} from "../../redux/configureStore";
import {selectUsers} from "../../redux/selectors";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";

type CartAction = "update" | "add" | "unavaiable";

const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectNewCart);
  const {items, loaderState} = cart;
  const [loaderId, setLoaderId] = useState<null | string>(null);

  const users = useSelector(selectUsers);

  const getCart = async () => {
    if (loaderState) {
      return;
    }
    if (!users.guestUser?.user_id && !users.user?.user_id) {
      return;
    }
    await dispatch(getCartItems());
  };

  const updateCart = async (
    product_id: string,
    product_size: string,
    cart_quantity: number,
    cart_action: CartAction
  ) => {
    try {
      if (loaderState) {
        return;
      }
      if (!users.guestUser?.user_id && !users.user?.user_id) {
        return;
      }

      setLoaderId(`${product_id}__${product_size}`);
      const resultAction = await dispatch(
        addToCart({product_id, product_size, cart_quantity})
      );
      setLoaderId(null);

      if (addToCart.fulfilled.match(resultAction)) {
        switch (cart_action) {
          case "update":
            toast.success("Cart updated successfully!");
            break;
          case "add":
            toast.success("Item added successfully!");
            break;
          case "unavaiable":
            toast.error("Max item order reached!");
            break;
        }
      } else if (addToCart.rejected.match(resultAction)) {
        switch (cart_action) {
          case "update":
            toast.error("Failed to update cart.");
            break;
          case "add":
            toast.error("Failed to add to cart.");
            break;
          case "unavaiable":
            toast.error("Max item order reached!");
            break;
        }
      }
    } catch {
      setLoaderId(null);
    }
  };

  const deleteItem = async (product_id: string, product_size: string) => {
    try {
      if (loaderState) {
        return;
      }
      if (!users.guestUser?.user_id && !users.user?.user_id) {
        return;
      }
      setLoaderId(`${product_id}__${product_size}`);
      const resultAction = await dispatch(
        deleteCartItem({product_id, product_size})
      );
      setLoaderId(null);

      if (deleteCartItem.fulfilled.match(resultAction)) {
        toast.success("Item deleted successfully!");
      } else if (deleteCartItem.rejected.match(resultAction)) {
        toast.error("Failed to delete item in the cart.");
      }
    } catch {
      setLoaderId(null);
    }
  };

  return {
    items,
    loaderState,
    getCart,
    updateCart,
    deleteItem,
    loaderId,
  };
};

export default useCart;
