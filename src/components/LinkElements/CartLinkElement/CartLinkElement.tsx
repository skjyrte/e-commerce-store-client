import {FC, useState} from "react";
import css from "./CartLinkElement.module.scss";
import classNames from "classnames";
import IconCart from "../../reactIcons/IconCart";
import CartModal from "../../modals/CartModal";
import IconLinkElement from "../IconLinkElement";
import {useSelector} from "react-redux";
import {selectCountCartItems} from "../../../redux/selectors";

const CartLinkElement: FC = () => {
  const [cartModalVisible, setCartModalVisible] = useState(false);

  const countCartItems = useSelector(selectCountCartItems);

  return (
    <div
      className={classNames(
        css["component-container"],
        cartModalVisible ? css["cart-modal-active"] : ""
      )}
      onMouseOver={() => {
        setCartModalVisible(true);
      }}
      onMouseOut={() => {
        setCartModalVisible(false);
      }}
    >
      <div className={css["total-items-quantity-sticker"]}>
        {countCartItems ? countCartItems : 0}
      </div>
      <IconLinkElement IconComponent={IconCart} path="/cart" linkClass={[]} />
      {cartModalVisible ? (
        <>
          <div className={css["hide-border-on-modal-active"]}></div>
          <CartModal />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartLinkElement;
