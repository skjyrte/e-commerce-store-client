import {FC, ElementType} from "react";
import css from "./IconButton.module.scss";
import classNames from "classnames";
import {ClipLoader} from "react-spinners";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  IconComponent: ElementType;
  dataTestId?: string;
  buttonClass?: string[];
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  IconComponent,
  dataTestId,
  buttonClass = [],
}) => {
  const buttonClassName = classNames(
    css["icon-button"],
    ...buttonClass.map((el) => css[el])
  );
  return (
    <button
      data-testid={dataTestId}
      className={buttonClassName}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <ClipLoader
          size={25}
          cssOverride={{
            animation: `1s infinite linear ${css["custom-clip-spin"]}`,
          }}
        />
      ) : (
        <IconComponent />
      )}
    </button>
  );
};

export default IconButton;
