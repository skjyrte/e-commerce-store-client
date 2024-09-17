import css from "./IconLinkElement.module.scss";
import {FC, ElementType} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

interface Props {
  path: string;
  IconComponent: ElementType;
  isDisabled?: boolean;
  dataTestId?: string;
  linkClass?: string[];
}

const IconLinkElement: FC<Props> = ({
  path,
  IconComponent,
  isDisabled = false,
  dataTestId,
  linkClass = [""],
}) => {
  const buttonClassName = classNames(
    css["link-element-component"],
    ...linkClass.map((el) => css[el]),
    isDisabled && css.disabled
  );
  return (
    <Link data-testid={dataTestId} className={buttonClassName} to={path}>
      <IconComponent />
    </Link>
  );
};

export default IconLinkElement;
