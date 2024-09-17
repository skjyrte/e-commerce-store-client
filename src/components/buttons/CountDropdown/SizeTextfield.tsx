import {FC} from "react";
import classNames from "classnames";
import css from "./SizeTextfield.module.scss";

interface Props {
  quantity: number;
}

const SizeTextfield: FC<Props> = (props) => {
  const {quantity} = props;

  return (
    <div className={classNames(css["size-textfield-box"])}>{quantity}</div>
  );
};

export default SizeTextfield;
