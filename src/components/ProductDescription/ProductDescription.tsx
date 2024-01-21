import {FC} from "react";
import css from "./ProductDescription.module.scss";

const ProductDescription: FC<{}> = () => {
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
      <div className={css.actionBox}>- 3 + Add to cart</div>
    </div>
  );
};

export default ProductDescription;
