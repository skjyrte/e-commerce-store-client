import {FC} from "react";
import css from "./AvailabilityBar.module.scss";
import classNames from "classnames";

type Props = {
  thresholds: number[];
  items: number;
  showNotInStock?: boolean;
};

const AvailabilityBar: FC<Props> = (Props) => {
  const {thresholds, items, showNotInStock = true} = Props;
  const displayBar = thresholds.map((el, index) => {
    const computedClass = classNames(
      css.bar,
      el < items ? css.avaiable : css.unavaiable
    );
    return <div className={computedClass} key={index}></div>;
  });

  if (showNotInStock === false) {
    return <div className={css.barWrapper}>{displayBar}</div>;
  } else {
    return items === 0 ? (
      <div className={css.notInStock}>Out of stock</div>
    ) : (
      <div className={css.barWrapper}>{displayBar}</div>
    );
  }
};

export default AvailabilityBar;
