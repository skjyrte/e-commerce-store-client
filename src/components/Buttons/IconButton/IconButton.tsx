import {FC, ElementType} from "react";
import css from "./IconButton.module.scss";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  IconComponent: ElementType;
  dataTestId?: string;
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  IconComponent,
  dataTestId,
}) => {
  const buttonClassName = classNames(
    css.iconButton,
    isDisabled && `${css.iconButton}_disabled`
  );
  return (
    <button
      data-testid={dataTestId}
      className={classNames(buttonClassName)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <IconComponent />
    </button>
  );
};

export default IconButton;
