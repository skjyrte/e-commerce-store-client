import {FC} from "react";
import css from "./CartView.module.scss";
import {selectCartItems} from "../../redux/selectors";
import CartThumbnailLarge from "../../components/CartThumbnailLarge";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {changeItemsCount} from "../../redux/counter/responseSlice";
import {addToCart} from "../../redux/counter/cartSlice";

const CartView: FC = () => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch<AppDispatch>();

  const renderCartList = () => {
    if (cartItems.value !== null) {
      return (
        <div className={css.cartOverflowContainer}>
          {cartItems.value.map((productInCart) => (
            <CartThumbnailLarge
              saveCartHandler={handleOnModifyItemCount}
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

  const handleOnModifyItemCount = (
    productId: string,
    selectedSize: string,
    changeBy: number
  ) => {
    console.log("ready to dispatch");
    if (productId !== undefined && selectedSize !== null) {
      dispatch(
        changeItemsCount({
          id: productId,
          size: selectedSize,
          changeBy: changeBy,
        })
      );
      dispatch(
        addToCart({
          id: productId,
          size: selectedSize,
          changeBy: changeBy,
        })
      );
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
