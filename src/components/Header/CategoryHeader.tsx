import {FC} from "react";
import classNames from "classnames";
import TextLinkElement from "../LinkElements/TextLinkElement";
import css from "./CategoryHeader.module.scss";

interface Props {
  categoryList: string[];
}

const CategoryHeader: FC<Props> = (props) => {
  const {categoryList} = props;

  const categoryLinks = categoryList.map((category, index) => {
    return (
      <li className={css["category-button-wrapper"]}>
        <TextLinkElement
          displayedText={category}
          path={`/${category}`}
          active={location.pathname.includes(`/${category}`)}
          size="medium"
          key={`cat-li-${index.toString()}`}
        />
      </li>
    );
  });

  return (
    <div className={css["category-header-container"]}>
      <ul className={classNames(css["choose-category-list"])}>
        {categoryLinks}
      </ul>
    </div>
  );
};

export default CategoryHeader;
