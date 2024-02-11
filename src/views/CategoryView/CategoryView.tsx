import {FC, useEffect} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {selectProductsByCategory} from "../../redux/selectors";
import {switchGender} from "../../redux/counter/selectedGenderSlice";

type Props = {};

const CategoryView: FC<Props> = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProductsByCategory);

  console.log(products);

  const categoryContent = products.map((obj: Product) => (
    <Link className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryThumbnail product={obj} />
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
