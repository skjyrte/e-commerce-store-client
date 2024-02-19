import {FC} from "react";
import css from "./CartModal.module.scss";
import {Link} from "react-router-dom";
import classNames from "classnames";
import CartThumbnail from "../CartThumbnail";

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

  console.log("cartItems");
  console.log(cartItems);

  const renderCartList = () => {
    if (cartItems.value !== null) {
      return cartItems.value.map((productInCart) => (
        <CartThumbnail
          onClick={onClick}
          cartProductEntryWithData={productInCart}
        />
      ));
    } else {
      return <div>abcd</div>;
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

  return (
    <div className={css.cartModalWrapper}>
      <div className={css.hideBorderBox}></div>
      {cartItems.itemCount === 0 ? renderEmptyCart() : renderCartList()}
    </div>
  );
};

export default CartModal;
