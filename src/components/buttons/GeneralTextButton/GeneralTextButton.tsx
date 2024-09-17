import css from "./GeneralTextButton.module.scss";
import {FC} from "react";
import classNames from "classnames";
import {ClipLoader} from "react-spinners";

interface Props {
  onClick: (e: unknown) => void;
  displayedText: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  dataTestId?: string;
  classProp: string[];
}

const GeneralTextButton: FC<Props> = ({
  onClick,
  displayedText,
  isDisabled = false,
  dataTestId,
  isLoading = false,
  classProp = [],
}) => {
  const buttonClassName = classNames(...classProp.map((el) => css[el]));
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
        <>{displayedText}</>
      )}
    </button>
  );
};

export default GeneralTextButton;
