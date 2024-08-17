import {FC, useState} from "react";
import css from "./HomeView.module.scss";
import ProductsSwiper from "../../components/ProductsSwiper";

const HomeView: FC = () => {
  const [hoveredID, setHoveredID] = useState<null | string>(null);

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  return (
    <div className={css.gridWrapper}>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Men's all products"}
          gender={"men"}
          category={""}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Women's running"}
          gender={"women"}
          category={"running"}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Men's running"}
          gender={"men"}
          category={"running"}
        />
      </div>
    </div>
  );
};

export default HomeView;
