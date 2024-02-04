import {FC, useState} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";
import {Link} from "react-router-dom";

type Props = {
  responseObject: ResponseObject;
  productId: string;
};

const CategoryView: FC<Props> = ({responseObject}) => {
  const categoryContent = responseObject.products.map((obj) => (
    <Link className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryThumbnail product={obj} />
    </Link>
  ));

  return <div className={css.gridWrapper}>{[...categoryContent]}</div>;
};

export default CategoryView;
