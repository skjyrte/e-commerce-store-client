import {FC} from "react";
import classNames from "classnames";
import css from "./Header.module.scss";

interface Props {
  brand: string;
  model: string;
  sellingPrice: string;
}

const Header: FC<Props> = (props) => {
  const {brand, model, sellingPrice} = props;

  const parsedSellingPrice = parseFloat(sellingPrice);
  return (
    <div className={classNames(css["component-box"])}>
      <header className={css.header}>
        <p className={classNames(css["product-brand"], css["textfield-wrap"])}>
          {brand}
        </p>
        <p className={classNames(css["product-model"], css["textfield-wrap"])}>
          {model}
        </p>
      </header>
      <p className={classNames(css["current-price"], css.row)}>
        ${parsedSellingPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default Header;
