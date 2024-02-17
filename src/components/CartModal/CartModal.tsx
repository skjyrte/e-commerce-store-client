import {FC} from "react";
import css from "./CartModal.module.scss";
import {Link} from "react-router-dom";

const CartModal: FC = () => {
  return (
    <div className={css.cartModalWrapper}>
      <div className={css.hideBorderBox}></div>
      <div className={css.emptyCart}>YOUR CART IS EMPTY</div>
      <div className={css.redirectToOther}>DON’T KNOW WHERE TO START?</div>
      <Link className={css.linkElement} to="/home">
        CHECK NEW OFFERS
      </Link>
    </div>
  );
};

export default CartModal;
