import {FC} from "react";
import classNames from "classnames";
import css from "./SizeTextfield.module.scss";

interface Props {
  sizeField: StockResponse;
}

const SizeTextfield: FC<Props> = (props) => {
  const {sizeField} = props;

  return (
    <div className={classNames(css["size-textfield-box"])}>
      {sizeField.size}
      {sizeField.count < 10 ? (
        <p className={classNames(css["low-stock-warning"])}>
          ({sizeField.count} item{sizeField.count === 1 ? "" : "s"} left)
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SizeTextfield;
