import {FC} from "react";
import classNames from "classnames";
import TextLinkElement from "../../LinkElements/TextLinkElement";
import css from "./DesktopHeaderDrawer.module.scss";

interface Props {
  categoryList: string[];
  activeGender: null | "men" | "women";
}

const DesktopHeaderDrawer: FC<Props> = (props) => {
  const {categoryList, activeGender} = props;

  const categoryLinks = categoryList.map((category, index) => {
    return (
      <li key={category} className={css["category-button-wrapper"]}>
        <TextLinkElement
          displayedText={category.toUpperCase()}
          path={`/${activeGender ? `${activeGender}/${category}` : ""}`}
          size="medium"
          key={`cat-li-${index.toString()}`}
        />
      </li>
    );
  });

  return (
    <div
      className={classNames(
        css["desktop-header-drawer-container"],
        !activeGender && css["hidden-drawer"]
      )}
    >
      <ul
        className={classNames(
          css["choose-category-list"],
          !activeGender && css["hidden-list"]
        )}
      >
        {categoryLinks}
      </ul>
    </div>
  );
};

export default DesktopHeaderDrawer;
