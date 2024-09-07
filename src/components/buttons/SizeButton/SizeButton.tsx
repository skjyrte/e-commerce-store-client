import {FC} from "react";
import css from "./SizeButton.module.scss";
import IconNarrowArrowNext from "../../inlineIcons/IconNarrowArrowNext";
import classNames from "classnames";

interface Props {
  onClick: () => void;
  currentSize: string | null;
  avaiableItems?: number;
}

const SizeButton: FC<Props> = ({onClick, currentSize, avaiableItems}) => {
  const displayStockInfo = (() => {
    if (avaiableItems !== undefined && avaiableItems < 3 && avaiableItems > 0) {
      return {
        text: `${avaiableItems} item${avaiableItems === 1 ? "" : "s"} left`,
        displayStockClass: "lowStock",
      };
    }
    if (avaiableItems === 0 || currentSize === null) {
      return {
        text: "No more items avaiable in stock",
        displayStockClass: "noMoreInStock",
      };
    } else {
      return {text: "", displayStockClass: ""};
    }
  })();

  return (
    <button
      onClick={onClick}
      className={classNames(
        css.SizeButton,
        css[displayStockInfo.displayStockClass]
      )}
    >
      <div
        className={classNames(
          css.Size,
          css[displayStockInfo.displayStockClass]
        )}
      >
        {currentSize}
      </div>
      <div
        className={classNames(
          css.AdditionalInfo,
          css[displayStockInfo.displayStockClass]
        )}
      >
        {displayStockInfo.text}
      </div>
      <div
        className={classNames(
          css.icon,
          css[displayStockInfo.displayStockClass]
        )}
      >
        <IconNarrowArrowNext />
      </div>
    </button>
  );
};

export default SizeButton;
