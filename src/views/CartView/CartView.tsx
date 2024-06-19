import {FC} from "react";
import css from "./CartView.module.scss";
import {selectCartItems} from "../../redux/selectors";
import CartProductThumbnailLarge from "../../components/thumbnails/CartProductThumbnailLarge";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {changeItemsCount} from "../../redux/slices/responseSlice";
import {addToCart} from "../../redux/slices/cartSlice";
import CartFooter from "../../components/CartFooter";
import {Link} from "react-router-dom";

const CartView: FC = () => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch<AppDispatch>();

  const renderCartList = () => {
    if (cartItems.value !== null) {
      return (
        <div className={css.cartOverflowContainer}>
          {cartItems.value.map((productInCart) => (
            <CartProductThumbnailLarge
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

  const renderCartFooter = () => {
    if (cartItems.value !== null && cartItems.value) {
      const total = cartItems.value.reduce((accumulator, product) => {
        if (product.additionalData !== null) {
          return product.additionalData.price * product.count + accumulator;
        } else {
          throw new Error("subtotal error");
        }
      }, 0);
      return <CartFooter shippingTotal={0} subtotal={total} />;
    } else {
      return <div></div>;
    }
  };

  if (cartItems.itemCount > 0) {
    return (
      <div className={css.CartView}>
        <div className={css.productBox}>
          <div className={css.header}>Cart {`(${cartItems.itemCount}pcs)`}</div>
          <div className={css.largeCartThumbnailWrapper}>
            {renderCartList()}
          </div>
        </div>
        <div className={css.summaryBox}>
          {renderCartFooter()}
          {/*           <div className={css.productCostTotal}></div>
          <div className={css.deliveryCost}></div>
          <div className={css.summaryCost}></div> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className={css.emptyCartView}>
        <div className={css.emptyCart}>YOUR CART IS EMPTY</div>
      </div>
    );
  }
};

export default CartView;
