import {FC, ElementType} from "react";
import css from "./IconTextButton.module.scss";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  IconComponent: ElementType;
  dataTestId?: string;
  buttonClass: string[];
  displayedText?: string;
}

const IconTextButton: FC<Props> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  IconComponent,
  dataTestId,
  buttonClass,
  displayedText,
}) => {
  const buttonClassName = classNames(
    css.iconTextButton,
    ...buttonClass.map((el) => css[el]),
    isDisabled && css.disabled
  );
  return (
    <button
      data-testid={dataTestId}
      className={classNames(buttonClassName)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <div className={css.iconBox}>
        <IconComponent />
      </div>
      <div className={css.displayedText}>{displayedText}</div>
    </button>
  );
};

export default IconTextButton;
