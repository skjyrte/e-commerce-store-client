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
      <div className={css["general-header"]}>Home</div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Sneakers"}
          gender={""}
          category={"sneakers"}
          index={0}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Running"}
          gender={""}
          category={"running"}
          index={1}
        />
      </div>
      <div className={css.productSwiperWrapper}>
        <ProductsSwiper
          headerText={"Casual"}
          gender={""}
          category={"casual"}
          index={2}
        />
      </div>
    </div>
  );
};

export default HomeView;
