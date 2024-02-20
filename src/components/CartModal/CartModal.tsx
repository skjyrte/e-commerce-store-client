import {FC} from "react";
import css from "./CartModal.module.scss";
import {Link} from "react-router-dom";
import CartThumbnail from "../CartThumbnail";
import CartFooter from "../CartFooter";
import classNames from "classnames";

type CartProductEntryWithData = {
  id: string;
  size: string;
  count: number;
  additionalData: Product | null;
};

type Props = {
  onClick: () => void;
  cartItems: {
    value: CartProductEntryWithData[] | null;
    itemCount: number;
  };
};

const CartModal: FC<Props> = (props) => {
  const {onClick, cartItems} = props;

  const renderCartList = () => {
    if (cartItems.value !== null) {
      return (
        <div className={css.cartOverflowContainer}>
          {cartItems.value.map((productInCart) => (
            <CartThumbnail
              onClick={onClick}
              cartProductEntryWithData={productInCart}
              key={`${productInCart.id}__${productInCart.size}`}
            />
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const renderCartFooter = () => {
    if (cartItems.value !== null && cartItems.value) {
      const total = cartItems.value.reduce((accumulator, product) => {
        if (product.additionalData !== null) {
          return product.additionalData.price * product.count + accumulator;
        } else {
          throw new Error("subtotal error");
        }
      }, 0);
      return <CartFooter shippingTotal={0} costTotal={total} />;
    } else {
      return <div></div>;
    }
  };

  const renderEmptyCart = () => {
    return (
      <>
        <div className={css.emptyCart}>YOUR CART IS EMPTY</div>
        <div className={css.redirectToOther}>DON’T KNOW WHERE TO START?</div>
        <Link onClick={onClick} className={css.linkElement} to="/home">
          CHECK NEW OFFERS
        </Link>
      </>
    );
  };

  if (cartItems.itemCount > 0) {
    return (
      <>
        <div className={css.cartModalWrapper}>
          {renderCartList()}
          {renderCartFooter()}
          <Link
            onClick={() => console.log("cart")}
            className={classNames(css.linkElement, css.cart)}
            to="/cart"
          >
            View cart
          </Link>
        </div>
      </>
    );
  } else {
    return <div className={css.cartModalWrapper}>{renderEmptyCart()}</div>;
  }
};

export default CartModal;
