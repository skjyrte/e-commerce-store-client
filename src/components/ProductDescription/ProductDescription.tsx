import {FC, useContext, useState} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../Buttons/GeneralTextButton";
import ChangeAmountButton from "../Buttons/ChangeAmountButton";
import {ApiResponseContextMan} from "../../components/AppContainer/AppContainer";

const ProductDescription: FC<{productId: string}> = ({productId}) => {
  const [itemsCount, setItemsCount] = useState(1);
  const responseObject = useContext(ApiResponseContextMan);

  const product =
    responseObject.products.find((el) => el.id === productId) ?? {};

  const {description, model, brand, price, initialPrice} = product as Product;

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
