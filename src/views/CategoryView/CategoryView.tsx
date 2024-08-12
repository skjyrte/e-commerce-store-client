import {FC, /* useEffect, */ useState} from "react";
import {useParams, Link} from "react-router-dom";
import css from "./CategoryView.module.scss";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import useMakeRequest from "../../hooks/useMakeRequest";
import CategoryProductPlaceholder from "../../components/placeholders/CategoryProductPlaceholder/CategoryProductPlaceholder";

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const CategoryView: FC = () => {
  const [hoveredID, setHoveredID] = useState<null | string>(null);
  const {gender, category} = useParams();

  console.log("gender", "category");
  console.log(gender, category);

  const request = useMakeRequest<ProductBasicDataResponse>(RequestType.GET, {
    gender,
    category,
  });

  const products = request.responseData;

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  const categoryContent = () => {
    const placeholderArray = new Array(6).fill("placeholder");

    if (products) {
      return products.map((obj: ProductBasicDataResponse) => (
        <Link
          key={obj.id}
          className={css.linkWrapper}
          to={`/product/${obj.id}`}
        >
          <CategoryProductThumbnail
            key={obj.id}
            productData={obj}
            onHover={onThumbnailHover}
            hovered={hoveredID === obj.id}
          />
        </Link>
      ));
    } else {
      if (request.loader) {
        return placeholderArray.map((obj: ProductBasicDataResponse, index) => (
          <CategoryProductPlaceholder key={index} />
        ));
      } else {
        return (
          <div className={css["no-products-found"]}>
            No Products Match Criteria
          </div>
        );
      }
    }
  };
  return <div className={css.gridWrapper}>{categoryContent()}</div>;
};

export default CategoryView;
