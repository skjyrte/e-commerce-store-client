import {FC, useState, useContext, useEffect} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";
import {Link} from "react-router-dom";
import {ApiResponseContext} from "../../components/AppContainer/AppContainer";
import {useLocation} from "react-router-dom";
import {mansProducts} from "../../components/Constants/data";
import {womansProducts} from "../../components/Constants/data";

type Props = {};

const CategoryView: FC<Props> = ({}) => {
  const [context, setContext] = useContext(ApiResponseContext);
  const location = useLocation();

  const categoryContent = context.products.map((obj: Product) => (
    <Link className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryThumbnail product={obj} />
    </Link>
  ));

  useEffect(() => {
    if (location.pathname === "/women") {
      setContext(womansProducts);
    }
    if (location.pathname === "/men") {
      setContext(mansProducts);
    }
  }, [location]);

  return <div className={css.gridWrapper}>{categoryContent}</div>;
};

export default CategoryView;
