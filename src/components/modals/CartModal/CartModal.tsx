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
        <div className={css.cartOverflowContainer}>
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
        <div className={css.emptyCart}>YOUR CART IS EMPTY</div>
        <div className={css.redirectToOther}>DON’T KNOW WHERE TO START?</div>
        <Link className={css.linkElement} to="/home">
          CHECK NEW OFFERS
        </Link>
      </>
    );
  };

  if (sumOfCartItems) {
    return (
      <>
        <div className={css.cartModalWrapper}>
          {renderCartList()}
          {renderCartFooter()}
          <Link className={classNames(css.linkElement, css.cart)} to="/cart">
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
