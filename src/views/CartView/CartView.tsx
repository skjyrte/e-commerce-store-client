import {FC, useState} from "react";
import css from "./CartView.module.scss";
import CartProductThumbnailLarge from "../../components/thumbnails/CartProductThumbnailLarge";
import useCart from "../../hooks/useCart";

const CartView: FC = () => {
  const cart = useCart();

  const {items, loaderState, updateCart, deleteItem, loaderId} = cart;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const onClickDropdown = (id: string | null) => {
    setActiveDropdown(id);
  };

  const itemsCount = !items
    ? null
    : items.reduce((prev, curr) => prev + curr.quantity, 0);

  if (items && itemsCount) {
    return (
      <div className={css["cart-view-container"]}>
        <div className={css["cart-contents-container"]}>
          <div className={css["main-cart-header"]}>
            Cart {`(${itemsCount.toString()}pcs)`}
          </div>
          <div className={css["cart-list-container"]}>
            <div className={css.cartOverflowContainer}>
              {items.map((obj) => {
                return (
                  <CartProductThumbnailLarge
                    onDeleteItem={(product_id, product_size) => {
                      void deleteItem(product_id, product_size);
                    }}
                    onUpdateQuantity={(product_id, product_size, quantity) => {
                      void updateCart(
                        product_id,
                        product_size,
                        quantity,
                        "update"
                      );
                    }}
                    cartProductEntryWithData={obj}
                    key={`${obj.id}__${obj.size}`}
                    onClickDropdown={onClickDropdown}
                    activeDropdown={activeDropdown}
                    isDropdownLoading={
                      Boolean(loaderState === "addToCart") &&
                      `${obj.id}__${obj.size}` === loaderId
                    }
                    isDeleteButtonLoading={
                      Boolean(loaderState === "deleteCartItem") &&
                      `${obj.id}__${obj.size}` === loaderId
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={css["cart-view-container"]}>
        <div className={css.emptyCartView}>
          <div className={css.emptyCart}>YOUR CART IS EMPTY</div>
        </div>
      </div>
    );
  }
};

export default CartView;
