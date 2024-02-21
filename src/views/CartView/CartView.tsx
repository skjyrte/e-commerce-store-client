import {FC} from "react";
import css from "./CartView.module.scss";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../redux/selectors";
import CartThumbnailLarge from "../../components/CartThumbnailLarge";

const CartView: FC = () => {
  const cartItems = useSelector(selectCartItems);

  const renderCartList = () => {
    if (cartItems.value !== null) {
      return (
        <div className={css.cartOverflowContainer}>
          {cartItems.value.map((productInCart) => (
            <CartThumbnailLarge
              onClick={() => {
                1;
              }}
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

  return (
    <div className={css.CartView}>
      <div className={css.productBox}>
        <div className={css.header}>Cart {`(${cartItems.itemCount}pcs)`}</div>
        <div className={css.largeCartThumbnailWrapper}>{renderCartList()}</div>
      </div>
      <div className={css.summaryBox}>
        <div className={css.productCostTotal}></div>
        <div className={css.deliveryCost}></div>
        <div className={css.summaryCost}></div>
      </div>
    </div>
  );
};

export default CartView;
