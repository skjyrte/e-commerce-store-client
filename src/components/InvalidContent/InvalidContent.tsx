import {FC} from "react";
import {Link} from "react-router-dom";
import css from "./InvalidContext.module.scss";

const InvalidContent: FC = () => {
  return (
    <div className={css["component-container"]}>
      <div className={css["component-header"]}>There is no such page</div>
      <div className={css["component-paragraph"]}>
        Page does not exists. Please check link once again.
      </div>
      <Link className={css["home-link-element"]} to="/home">
        Check other offers
      </Link>
    </div>
  );
};

export default InvalidContent;
