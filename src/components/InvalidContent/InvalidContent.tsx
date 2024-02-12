import {FC} from "react";
import {Link} from "react-router-dom";
import css from "./InvalidContext.module.scss";

const InvalidContent: FC = ({}) => {
  return (
    <div className={css.contentWrapper}>
      <div className={css.header}>There is no such page</div>
      <div className={css.para}>
        Page does not exists. Please check link once again.
      </div>
      <Link className={css.linkElement} to="/home">
        Check other offers
      </Link>
    </div>
  );
};

export default InvalidContent;
