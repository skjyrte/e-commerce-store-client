import {FC, useState} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../Buttons/GeneralTextButton";
import ChangeAmountButton from "../Buttons/ChangeAmountButton";
import SizeButton from "../Buttons/SizeButton";

type Props = {
  currentProduct: Product;
  onClickSize: () => void;
  currentSize: string | null;
};

const ProductDescription: FC<Props> = ({
  currentProduct,
  onClickSize,
  currentSize,
}) => {
  const [itemsCount, setItemsCount] = useState(1);

  const {description, model, brand, price, initialPrice} =
    currentProduct as Product;

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
      <SizeButton onClick={onClickSize} currentSize={currentSize} />
      <div className={css.actionBox}>
        <ChangeAmountButton
          displayedText="-"
          onClick={() => {
            if (itemsCount > 0) {
              setItemsCount(itemsCount - 1);
            }
          }}
          classProp={["left"]}
        />
        <div className={css.itemsCount}>{itemsCount}</div>
        <ChangeAmountButton
          displayedText="+"
          onClick={() => setItemsCount(itemsCount + 1)}
          classProp={["right"]}
        />
        <GeneralTextButton
          displayedText="Add to cart"
          classProp={["addToCart"]}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
