import {FC, useState} from "react";
import css from "./CategoryThumbnail.module.scss";
import classNames from "classnames";

type Props = {product: Product};

const CategoryThumbnail: FC<Props> = ({
  product: {id, title, price, brand, thumbnail, initialPrice},
}) => {
  const discountPercentage = initialPrice
    ? Math.round((-100 * (initialPrice - price)) / price)
    : undefined;
  return (
    <div key={id} className={css.thumbnailBox}>
      <div className={css.cardImageBox}>
        <img src={thumbnail} />
        <div
          className={classNames(css.discountPercentage, css.rowFlexContainer)}
        >
          {discountPercentage}%
        </div>
      </div>

      <div className={classNames(css.brand, css.rowFlexContainer)}>{brand}</div>
      <div className={classNames(css.title, css.rowFlexContainer)}>{title}</div>
      <div className={classNames(css.priceBox, css.rowFlexContainer)}>
        <div className={classNames(css.price, css.rowFlexContainer)}>
          ${price.toFixed(2)}
        </div>
        <div className={classNames(css.initialPrice, css.rowFlexContainer)}>
          ${initialPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CategoryThumbnail;
