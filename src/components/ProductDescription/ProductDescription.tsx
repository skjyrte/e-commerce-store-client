import {FC} from "react";
import css from "./ProductDescription.module.scss";
import TextButton from "../Buttons/TextButton";
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

      <div className={css.priceWrapper}>
        <div className={css.price}>$125</div>
        <div className={css.priceDrop}>50%</div>
      </div>
      <div className={css.priceWas}>$250</div>
      <div className={css.actionBox}>
        <TextButton displayedText="-" />
        <div className={css.itemsCount}>{itemsCount}</div>
        <TextButton displayedText="+" />
        <TextButton displayedText="Add to cart" />
      </div>
    </div>
  );
};

export default ProductDescription;
