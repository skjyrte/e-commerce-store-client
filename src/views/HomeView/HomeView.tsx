import {FC, useState} from "react";
import css from "./HomeView.module.scss";
import ProductsSwiper from "../../components/ProductsSwiper";

const HomeView: FC = () => {
  const [error, setError] = useState(false);

  const onError = (err: boolean) => {
    setError(err);
  };

  if (error) {
    return (
      <div className={css["no-products-found"]}>
        We Have a Problem, Please Try Again Later.
      </div>
    );
  }

  return (
    <div className={css["grid-wrapper"]}>
      <div className={css["general-header"]}>Home</div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Sneakers"}
          gender={""}
          category={"sneakers"}
          index={0}
          onError={onError}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Running"}
          gender={""}
          category={"running"}
          index={1}
          onError={onError}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Casual"}
          gender={""}
          category={"casual"}
          index={2}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default HomeView;
