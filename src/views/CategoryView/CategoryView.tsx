import {FC, useEffect} from "react";
import css from "./CategoryView.module.scss";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {selectProductsByCategory} from "../../redux/selectors";
import {switchGender} from "../../redux/slices/selectedGenderSlice";

const CategoryView: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProductsByCategory);

  const categoryContent = products.map((obj: Product) => (
    <Link key={obj.id} className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryProductThumbnail product={obj} />
    </Link>
  ));

  useEffect(() => {
    if (location.pathname === "/men") {
      dispatch(switchGender("men"));
    }
    if (location.pathname === "/women") {
      dispatch(switchGender("women"));
    }
  }, [location]);

  return (
    <div className={css.gridWrapper}>
      {categoryContent.length > 0 ? categoryContent : "no products or loading"}
    </div>
  );
};

export default CategoryView;
