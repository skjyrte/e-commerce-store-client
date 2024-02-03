import {FC, useState} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";

type Props = {
  responseObject: ResponseObject;
};

const CategoryView: FC<Props> = ({responseObject}) => {
  const categoryContent = responseObject.products.map((obj) => (
    <CategoryThumbnail product={obj} />
  ));

  return (
    <div className={css.gridWrapper}>
      {[
        ...categoryContent,
        ...categoryContent,
        ...categoryContent,
        ...categoryContent,
        ...categoryContent,
      ]}
    </div>
  );
};

export default CategoryView;
