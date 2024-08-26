import {FC} from "react";
import css from "./MiniHeader.module.scss";
import TextLinkElement from "../LinkElements/TextLinkElement";
import classNames from "classnames";

import {useLocation} from "react-router-dom";

const MiniHeader: FC = () => {
  const location = useLocation();

  return (
    <div
      className={classNames(
        css["mini-header-relative-container"],
        location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          css["header-not-visible"]
      )}
    >
      <div className={css["site-home-button-wrapper"]}>
        <TextLinkElement
          displayedText="SNEAKERS"
          path={"/"}
          size="large-no-media"
        />
      </div>
    </div>
  );
};
export default MiniHeader;
