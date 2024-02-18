import {FC, useState} from "react";
import css from "./CartButton.module.scss";
import classNames from "classnames";
import IconButton from "../IconButton";
import IconCart from "../../Icons/IconCart";
import CartModal from "../../CartModal";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../../redux/selectors";

type Props = {};

const CartButton: FC<Props> = ({}) => {
  const [cartModalVisible, setCartModalVisible] = useState(false);

  const cartItems = useSelector(selectCartItems);
  console.log("cartItems");
  console.log(cartItems);

  const onCartClick = () => {
    setCartModalVisible((prevState) => !prevState);
  };

  const renderItemsCountSticker = (itemsCount: number) => {
    return <div className={css.itemCountSticker}>{itemsCount}</div>;
  };

  return (
    <div
      className={classNames(
        css.cartButtonWrapper,
        cartModalVisible === true ? css.cartOpened : ""
      )}
    >
      {renderItemsCountSticker(cartItems.itemCount)}
      <IconButton
        IconComponent={IconCart}
        onClick={onCartClick}
        buttonClass={["cartButton"]}
      />
      {cartModalVisible === true ? (
        <CartModal onClick={onCartClick} cartItems={cartItems} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartButton;
