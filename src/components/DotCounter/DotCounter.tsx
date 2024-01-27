import {FC} from "react";
import css from "./DotCounter.module.scss";

type Props = {
  currentItem: number;
  totalItem: number;
};

const DotCounter: FC<Props> = ({currentItem, totalItem}) => {
  const dotList = Array(totalItem)
    .fill("")
    .map((el, index) => (
      <li
        className={`${css.item} ${currentItem === index ? css.current : ""}`}
        key={index}
      ></li>
    ));
  return <ul className={css.DotCounter}>{dotList}</ul>;
};

export default DotCounter;
