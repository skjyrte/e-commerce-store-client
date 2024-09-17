import {FC, useState} from "react";
import css from "./CartLinkElement.module.scss";
import classNames from "classnames";
import IconCart from "../../inlineIcons/IconCart";
import CartModal from "../../modals/CartModal";
import IconLinkElement from "../IconLinkElement";
import {useSelector} from "react-redux";
import {selectCountCartItems} from "../../../redux/selectors";

const CartLinkElement: FC = () => {
  const [cartModalVisible, setCartModalVisible] = useState(false);

  const sumOfCartItems = useSelector(selectCountCartItems);

  const onMouseOver = () => {
    setCartModalVisible(true);
  };

  const onMouseOut = () => {
    setCartModalVisible(false);
  };

  const renderItemsCountSticker = (itemsCount: number) => {
    return <div className={css.itemCountSticker}>{itemsCount}</div>;
  };

  return (
    <div
      className={classNames(
        css.cartLinkElementWrapper,
        cartModalVisible ? css.cartOpened : ""
      )}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {renderItemsCountSticker(sumOfCartItems ? sumOfCartItems : 0)}
      <IconLinkElement
        IconComponent={IconCart}
        path="/cart"
        linkClass={["cart"]}
      />
      {cartModalVisible ? (
        <>
          <div className={css.hideBorderBox}></div>
          <CartModal />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartLinkElement;
