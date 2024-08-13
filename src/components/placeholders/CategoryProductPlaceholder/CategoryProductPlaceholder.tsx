import {FC} from "react";
import css from "./CategoryProductPlaceholder.module.scss";
import FigurePlaceholder from "./FigurePlaceholder";
import TextLoader from "../../loaders/TextLoader";

const CategoryProductPlaceholder: FC = () => {
  return (
    <article className={css["product-thumbnail"]}>
      <div className={css["product-content"]}>
        <FigurePlaceholder />
        <div className={css["loading-state-box"]}>
          <TextLoader />
        </div>
      </div>
    </article>
  );
};

export default CategoryProductPlaceholder;
