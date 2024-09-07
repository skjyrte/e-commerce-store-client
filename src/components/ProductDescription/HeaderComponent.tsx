import {FC} from "react";
import classNames from "classnames";
import css from "./HeaderComponent.module.scss";

interface Props {
  brand: string;
  model: string;
  sellingPrice: string;
  category: string;
}

const HeaderComponent: FC<Props> = (props) => {
  const {brand, model, sellingPrice, category} = props;

  const parsedSellingPrice = parseFloat(sellingPrice);
  return (
    <div className={classNames(css["component-box"])}>
      <header className={css.header}>
        <p className={classNames(css["product-brand"], css["textfield-wrap"])}>
          {brand}
        </p>
        <p className={classNames(css["product-model"], css["textfield-wrap"])}>
          {model} - {category} shoes
        </p>
      </header>
      <div className={classNames(css["price-box"])}>
        <p className={classNames(css["current-price"], css.row)}>
          ${parsedSellingPrice.toFixed(2)}
        </p>
        <p className={classNames(css["price-note"], css.row)}>inc VAT</p>
      </div>
    </div>
  );
};

export default HeaderComponent;
