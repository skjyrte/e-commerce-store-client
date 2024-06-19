import {FC, useState, useEffect} from "react";
import css from "./CartLinkElement.module.scss";
import classNames from "classnames";
import IconCart from "../../icons/IconCart";
import CartModal from "../../modals/CartModal";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../../redux/selectors";
import {useLocation} from "react-router-dom";
import IconLinkElement from "../IconLinkElement";

type Props = {};

const CartButton: FC<Props> = ({}) => {
  const [cartModalVisible, setCartModalVisible] = useState(false);
  let location = useLocation();

  const cartItems = useSelector(selectCartItems);

  const onCartClick = () => {};

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
    console.log("location.pathname");
    console.log(location.pathname);
    if (location.pathname !== "/cart") {
      setCartModalVisible(true);
    }
  }, [cartItems]);

  return (
    <div
      className={classNames(
        css.cartButtonWrapper,
        cartModalVisible === true ? css.cartOpened : ""
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
      {cartModalVisible === true ? (
        <>
          <div className={css.hideBorderBox}></div>
          <CartModal onClick={onCartClick} cartItems={cartItems} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartButton;
