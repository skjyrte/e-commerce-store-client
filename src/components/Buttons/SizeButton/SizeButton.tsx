import {FC} from "react";
import css from "./SizeButton.module.scss";
import NarrowArrowNext from "../../Icons/NarrowArrowNext";
import classNames from "classnames";

type Props = {
  onClick: () => void;
  currentSize: string | null;
  noMoreInStock: boolean;
};

const SizeButton: FC<Props> = ({onClick, currentSize, noMoreInStock}) => {
  const displayStockInfo = noMoreInStock
    ? "No more items avaiable in stock"
    : "";
  const displayStockClass = noMoreInStock ? css.noMoreInStock : "";
  return (
    <button
      onClick={onClick}
      className={classNames(css.SizeButton, displayStockClass)}
    >
      <div className={classNames(css.Size, displayStockClass)}>
        {currentSize}
      </div>
      <div className={classNames(css.AdditionalInfo, displayStockClass)}>
        {displayStockInfo}
      </div>
      <div className={classNames(css.icon, displayStockClass)}>
        <NarrowArrowNext />
      </div>
    </button>
  );
};

export default SizeButton;
