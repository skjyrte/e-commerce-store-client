import {FC, useState} from "react";
import css from "./CartButton.module.scss";
import classNames from "classnames";
import IconButton from "../IconButton";
import IconCart from "../../Icons/IconCart";
import CartModal from "../../CartModal";

type Props = {};

const CartButton: FC<Props> = ({}) => {
  const [cartModalVisible, setCartModalVisible] = useState(false);

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
      {renderItemsCountSticker(123)}
      <IconButton
        IconComponent={IconCart}
        onClick={onCartClick}
        buttonClass={["cartButton"]}
      />
      {cartModalVisible === true ? <CartModal /> : <></>}
    </div>
  );
};

export default CartButton;
