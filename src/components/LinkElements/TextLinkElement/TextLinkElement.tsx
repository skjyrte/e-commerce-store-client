import css from "./TextLinkElement.module.scss";
import {FC} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

interface Props {
  displayedText: string;
  dataTestId?: string;
  path: string;
  size?: string;
}

const TextLinkElement: FC<Props> = ({
  displayedText,
  dataTestId,
  path,
  size,
}) => {
  const classTitle = classNames(css.LinkElement, size && css[size]);

  return (
    <Link data-testid={dataTestId} className={classTitle} to={path}>
      {displayedText}
    </Link>
  );
};

export default TextLinkElement;
