import {FC} from "react";
import css from "./CartModal.module.scss";
import {Link} from "react-router-dom";
import CartProductThumbnailModal from "../../thumbnails/CartProductThumbnailModal";
import CartFooter from "../../CartFooter";
import classNames from "classnames";
import useCart from "../../../hooks/useCart";
import {useSelector} from "react-redux";
import {
  selectCountCartItems,
  selectTotalItemsValue,
} from "../../../redux/selectors";

const CartModal: FC = () => {
  const cart = useCart();
  const {items} = cart;
  const sumOfCartItems = useSelector(selectCountCartItems);

  const totalItemsValue = useSelector(selectTotalItemsValue);

  const renderCartList = () => {
    if (items) {
      return (
        <div className={css["cart-overflow-container"]}>
          {items.map((product) => (
            <CartProductThumbnailModal
              product={product}
              key={`${product.id}__${product.size}`}
            />
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const renderCartFooter = () => {
    if (items && totalItemsValue) {
      return <CartFooter shippingTotal={0} subtotal={totalItemsValue} />;
    } else {
      return <div></div>;
    }
  };

  const renderEmptyCart = () => {
    return (
      <>
        <div className={css["empty-cart"]}>YOUR CART IS EMPTY</div>
        <div className={css["redirect-text"]}>DON’T KNOW WHERE TO START?</div>
        <Link className={css["cart-link-element"]} to="/home">
          CHECK NEW OFFERS
        </Link>
      </>
    );
  };

  if (sumOfCartItems) {
    return (
      <>
        <div className={css["cart-modal-container"]}>
          {renderCartList()}
          {renderCartFooter()}
          <Link
            className={classNames(css["cart-link-element"], css.cart)}
            to="/cart"
          >
            View cart
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <div className={css["cart-modal-container"]}>{renderEmptyCart()}</div>
    );
  }
};

export default CartModal;
