import css from "./TextButton.module.scss";
import {FC} from "react";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  displayedText: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isNowSelected?: boolean;
  size?: ButtonSizes;
  dataTestId?: string;
}

type ButtonSizes = "medium" | "small";
/*     `text-button_${size} */
const TextButton: FC<Props> = ({
  onClick,
  displayedText,
  isDisabled = false,
  isNowSelected = false,
  size = "medium",
  dataTestId,
}) => {
  const buttonClassName = classNames(
    css.textButton,
    `${css.textButton}_${size}`
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

export default TextButton;
