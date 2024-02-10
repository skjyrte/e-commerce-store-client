import {FC, useState, useEffect} from "react";
import css from "./CategoryView.module.scss";
import CategoryThumbnail from "../../components/CategoryThumbnail";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/configureStore";
import {selectProductsByCategory} from "../../redux/selectors";
import {switchMen, switchWomen} from "../../redux/counter/selectedGenderSlice";

type Props = {};

function filterProducts(data: Product[], query: string) {
  data.filter((el) => el.gender === query);
}

const CategoryView: FC<Props> = ({}) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const databaseObject = useSelector(
    (state: RootState) => state.response.value
  );

  const CompletedTodosCount = ({gender}: {gender: string}) => {
    const matchingCount = useSelector((state: any) =>
      selectProductsByCategory(state, gender)
    );
  };

  const simpleobject = useSelector((state: RootState) => state.gender.value);
  console.log(simpleobject);
  console.log(simpleobject);

  const categoryContent = currentProducts.map((obj: Product) => (
    <Link className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryThumbnail product={obj} />
    </Link>
  ));

  useEffect(() => {
    console.log(currentProducts);
    console.log(location.pathname);
    if (location.pathname === "/men") {
      setCurrentProducts(
        databaseObject.products.filter((el) => el.gender === "men")
      );
      dispatch(switchMen());
    }
    if (location.pathname === "/women") {
      setCurrentProducts(
        databaseObject.products.filter((el) => el.gender === "women")
      );
      dispatch(switchWomen());
    }
  }, [location]);

  return (
    <div className={css.gridWrapper}>
      {categoryContent.length > 0 ? categoryContent : "no products or loading"}
    </div>
  );
};

export default CategoryView;
