import {FC, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import css from "./CategoryView.module.scss";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import useMakeRequest from "../../hooks/useMakeRequest";
import CategoryProductPlaceholder from "../../components/loaders/CategoryProductPlaceholder/CategoryProductPlaceholder";
import useCart from "../../hooks/useCart";

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const CategoryView: FC = () => {
  const [hoveredID, setHoveredID] = useState<null | string>(null);
  const {gender, category} = useParams();

  const request = useMakeRequest<ProductBasicDataResponse>(RequestType.GET, {
    gender,
    category,
  });

  const products = request.responseData;
  const error = request.error;

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  const categoryContent = () => {
    const placeholderArray = new Array(6).fill("placeholder");
    if (error) {
      if (error.status === 404) {
        return (
          <div className={css["no-products-found"]}>
            No Products Match Criteria
          </div>
        );
      } else {
        return (
          <div className={css["no-products-found"]}>
            We Have a Problem, Please Try Again Later.
          </div>
        );
      }
    } else if (request.loader) {
      return placeholderArray.map((obj: ProductBasicDataResponse, index) => (
        <CategoryProductPlaceholder key={index} />
      ));
    } else if (products) {
      return products.map((obj: ProductBasicDataResponse) => (
        <Link
          key={obj.product_id}
          className={css.linkWrapper}
          to={`/product/${obj.product_id}`}
        >
          <CategoryProductThumbnail
            productData={obj}
            onHover={onThumbnailHover}
            hovered={hoveredID === obj.product_id}
            showSizeTable={true}
          />
        </Link>
      ));
    } else {
      <div className={css["no-products-found"]}>some different case</div>;
    }
  };
  return <div className={css.gridWrapper}>{categoryContent()}</div>;
};

export default CategoryView;
