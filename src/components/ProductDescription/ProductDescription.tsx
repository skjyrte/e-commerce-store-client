import {FC, useState, useEffect} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../Buttons/GeneralTextButton";
import ChangeAmountButton from "../Buttons/ChangeAmountButton";
import SizeButton from "../Buttons/SizeButton";

type Props = {
  currentProduct: Product;
  onClickSize: () => void;
  currentSize: string | null;
  onAddToBasket: (itemsCount: number) => void;
};

const ProductDescription: FC<Props> = ({
  currentProduct,
  onClickSize,
  currentSize,
  onAddToBasket,
}) => {
  const {description, model, brand, price, initialPrice} =
    currentProduct as Product;

  const [itemsCount, setItemsCount] = useState(1);

  const avaiableItems = currentProduct.stock.find(
    (sizeObj) => sizeObj.size === currentSize
  )?.count;

  const onCountDecrease = () => {
    if (itemsCount > 1) {
      setItemsCount(itemsCount - 1);
    } else {
      return;
    }
  };

  const decreaseCountDisabledCheck = itemsCount <= 1 ? true : false;

  const onCountIncrease = () => {
    if (avaiableItems !== undefined && itemsCount < avaiableItems) {
      setItemsCount(itemsCount + 1);
    } else {
      return;
    }
  };

  const increaseCountDisabledCheck =
    avaiableItems !== undefined && itemsCount >= avaiableItems ? true : false;

  const addToCartButtonDisabledCheck =
    (avaiableItems !== undefined && itemsCount > avaiableItems) ||
    avaiableItems === 0
      ? true
      : false;

  console.log(avaiableItems);

  useEffect(() => {
    if (avaiableItems === 0) {
      setItemsCount(0);
    } else {
      setItemsCount(1);
    }
  }, [currentSize, avaiableItems]);

  return (
    <div className={css.box}>
      <div className={css.brand}>{brand}</div>
      <div className={css.model}>{model}</div>
      <div className={css.description}>{description}</div>
      <div className={css.currentPriceWrapper}>
        <div className={css.currentPrice}>${price}</div>
        <div className={css.note}>incl. VAT</div>
      </div>
      <div className={css.pastPriceWrapper}>
        <div className={css.priceWas}>${initialPrice}</div>
        <div className={css.priceDrop}>-50%</div>
      </div>
      <div className={css.SizeHeader}>choose your size</div>
      <SizeButton
        onClick={onClickSize}
        currentSize={currentSize}
        avaiableItems={avaiableItems}
      />
      <div className={css.actionBox}>
        <ChangeAmountButton
          displayedText="-"
          onClick={onCountDecrease}
          classProp={["left"]}
          isDisabled={decreaseCountDisabledCheck}
        />
        <div className={css.itemsCount}>{itemsCount}</div>
        <ChangeAmountButton
          displayedText="+"
          onClick={onCountIncrease}
          classProp={["right"]}
          isDisabled={increaseCountDisabledCheck}
        />
        <GeneralTextButton
          displayedText="🛒 Add to cart 🛒"
          classProp={["addToCart"]}
          onClick={() => {
            console.log("logged");
            onAddToBasket(itemsCount);
          }}
          isDisabled={addToCartButtonDisabledCheck}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
