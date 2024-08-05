import {FC} from "react";
import classNames from "classnames";
import css from "./Size.module.scss";

interface Props {
  arrayOfSizes: StockResponse[];
}

const Size: FC<Props> = (props) => {
  const {arrayOfSizes} = props;
  if (arrayOfSizes.length > 0) {
    return arrayOfSizes.map((sizeObject, index) => (
      <div
        key={index}
        className={classNames(
          css["size-option"],
          sizeObject.count > 0 ? "" : css["out-of-stock-label"]
        )}
      >
        {sizeObject.size}
      </div>
    ));
  } else {
    return (
      <div
        className={classNames(css["size-option"], css["out-of-stock-label"])}
      >
        {"Currently not available"}
      </div>
    );
  }
};

export default Size;
