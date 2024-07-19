import {FC, /* useEffect, */ useState} from "react";
import {useParams} from "react-router-dom";
import css from "./CategoryView.module.scss";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import useMakeRequest from "../../hooks/useMakeRequest";

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const CategoryView: FC = () => {
  const [hoveredID, setHoveredID] = useState<null | string>(null);
  const {gender} = useParams();

  const products = useMakeRequest(RequestType.GET, {gender});

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  const categoryContent = () => {
    if (products) {
      return products.map((obj: ProductWithData) => (
        <CategoryProductThumbnail
          key={obj.id}
          productData={obj}
          onHover={onThumbnailHover}
          hovered={hoveredID === obj.id}
        />
      ));
    } else {
      return <div>Loading...or no products?</div>;
    }
  };
  return <div className={css.gridWrapper}>{categoryContent()}</div>;
};

export default CategoryView;
