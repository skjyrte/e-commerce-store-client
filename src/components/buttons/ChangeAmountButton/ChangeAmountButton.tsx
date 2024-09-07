import css from "./ChangeAmountButton.module.scss";
import {FC} from "react";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  displayedText: string;
  isDisabled?: boolean;
  dataTestId?: string;
  classProp?: string[];
}

const ChangeAmountButton: FC<Props> = ({
  onClick,
  displayedText,
  isDisabled = false,
  dataTestId,
  classProp = [],
}) => {
  const buttonClassName = classNames(
    css.changeAmountButton,
    ...classProp.map((el) => css[el]),
    isDisabled ? css.disabled : ""
  );
  return (
    <button
      data-testid={dataTestId}
      className={buttonClassName}
      onClick={onClick}
      disabled={isDisabled}
    >
      {displayedText}
    </button>
  );
};

export default ChangeAmountButton;
