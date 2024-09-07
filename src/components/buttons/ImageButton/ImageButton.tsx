import {FC} from "react";
import css from "./ImageButton.module.scss";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  image: string;
  dataTestId?: string;
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  image,
  dataTestId,
}) => {
  const buttonClassName = classNames(
    css.imageButton,
    isDisabled && `${css.imageButton}_disabled`
  );
  return (
    <button
      data-testid={dataTestId}
      className={classNames(buttonClassName)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img src={image} />
    </button>
  );
};

export default IconButton;
