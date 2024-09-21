import css from "./TextLinkElement.module.scss";
import {FC} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

interface Props {
  displayedText: string;
  dataTestId?: string;
  path: string;
  active?: boolean;
  size?: string;
  onClick?: () => void;
  classProp?: string[];
}

const TextLinkElement: FC<Props> = ({
  displayedText,
  dataTestId,
  path,
  active,
  size,
  onClick,
  classProp = [],
}) => {
  const buttonClassName = classProp.map((el) => css[el]);
  console.log(buttonClassName);
  const classTitle = classNames(
    css["link-element"],
    active && css["link-element-active"],
    size && css[`link-element-size-${size}`],
    ...buttonClassName
  );

  return (
    <Link
      onClick={onClick}
      data-testid={dataTestId}
      className={classTitle}
      to={path}
    >
      {displayedText}
    </Link>
  );
};

export default TextLinkElement;
