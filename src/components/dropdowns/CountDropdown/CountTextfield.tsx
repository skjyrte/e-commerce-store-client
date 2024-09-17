import {FC} from "react";
import classNames from "classnames";
import css from "./CountTextfield.module.scss";

interface Props {
  quantity: number;
}

const CountTextfield: FC<Props> = (props) => {
  const {quantity} = props;

  return (
    <div className={classNames(css["size-textfield-box"])}>{quantity}</div>
  );
};

export default CountTextfield;
