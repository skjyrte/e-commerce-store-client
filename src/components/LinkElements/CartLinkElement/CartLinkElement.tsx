import {FC, useState, useEffect} from "react";
import css from "./CartLinkElement.module.scss";
import classNames from "classnames";
import IconCart from "../../inlineIcons/IconCart";
import CartModal from "../../modals/CartModal";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../../redux/selectors";
import {useLocation} from "react-router-dom";
import IconLinkElement from "../IconLinkElement";

const CartLinkElement: FC = () => {
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const location = useLocation();

  const cartItems = useSelector(selectCartItems);

  const onMouseOver = () => {
    setCartModalVisible(true);
  };

  const onMouseOut = () => {
    setCartModalVisible(false);
  };

  const renderItemsCountSticker = (itemsCount: number) => {
    return <div className={css.itemCountSticker}>{itemsCount}</div>;
  };

  useEffect(() => {
    if (location.pathname !== "/cart" && cartItems.itemCount !== 0) {
      setCartModalVisible(true);
    }
  }, [cartItems]);

  return (
    <div
      className={classNames(
        css.cartLinkElementWrapper,
        cartModalVisible ? css.cartOpened : ""
      )}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {renderItemsCountSticker(cartItems.itemCount)}
      <IconLinkElement
        IconComponent={IconCart}
        path="/cart"
        linkClass={["cart"]}
      />
      {cartModalVisible ? (
        <>
          <div className={css.hideBorderBox}></div>
          <CartModal cartItems={cartItems} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartLinkElement;
