import {FC, useState} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";
import {Link} from "react-router-dom";

type Props = {
  responseObject: ResponseObject;
};

const CategoryView: FC<Props> = ({responseObject}) => {
  const categoryContent = responseObject.products.map((obj) => (
    <Link className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryThumbnail product={obj} />
    </Link>
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
