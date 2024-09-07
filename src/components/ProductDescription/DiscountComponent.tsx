import {FC} from "react";
import classNames from "classnames";
import css from "./DiscountComponent.module.scss";

interface Props {
  listingPrice: string;
  sellingPrice: string;
}

const DiscountComponent: FC<Props> = (props) => {
  const {listingPrice, sellingPrice} = props;

  const parsedSellingPrice = parseFloat(sellingPrice);
  const parsedListingPrice = parseFloat(listingPrice);

  if (parsedListingPrice > parsedSellingPrice) {
    const discount =
      ((parsedListingPrice - parsedSellingPrice) / parsedListingPrice) * 100;
    return (
      <div className={classNames(css["component-box"])}>
        <p className={classNames(css["discount-notice"])}>
          Lowest Price in 30 Days
        </p>
        <div className={classNames(css["price-and-discount-box"])}>
          <p className={classNames(css["original-price"])}>
            ${parsedListingPrice.toFixed(2)}
          </p>
          <p className={classNames(css["discount-value"])}>
            ({discount.toFixed(0)}% OFF)
          </p>
        </div>
      </div>
    );
  } else return <></>;
};

export default DiscountComponent;
