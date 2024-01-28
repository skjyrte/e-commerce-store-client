import {FC} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../Buttons/GeneralTextButton";
import ChangeAmountButton from "../Buttons/ChangeAmountButton";
import {useState} from "react";

const ProductDescription: FC<{}> = () => {
  const [itemsCount, setItemsCount] = useState(1);
  return (
    <div className={css.box}>
      <div className={css.brand}>SNEAKER COMPANY</div>
      <div className={css.model}>Fall Limited Sneakers</div>
      <div className={css.description}>
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </div>
      <div className={css.currentPriceWrapper}>
        <div className={css.currentPrice}>$125</div>
        <div className={css.note}>incl. VAT</div>
      </div>

      <div className={css.pastPriceWrapper}>
        <div className={css.priceWas}>$250</div>
        <div className={css.priceDrop}>-50%</div>
      </div>
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
