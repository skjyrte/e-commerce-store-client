import {FC, useState} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../buttons/GeneralTextButton";
import HeaderComponent from "./HeaderComponent";
import DiscountComponent from "./DiscountComponent";
import SizeDropdown from "../buttons/SizeDropdown";
import NotReadyYet from "../../helper/NotReadyYet";

interface Props {
  currentProduct: ProductExtraDataResponse;
}

const ProductDescription: FC<Props> = ({currentProduct}) => {
  const {
    id,
    model,
    brand,
    price,
    initial_price,
    category,
    stock_array,
    short_description,
  } = currentProduct;

  const [selectedSize, setSelectedSize] = useState<null | string>(null);

  const onSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className={css["product-description-container"]}>
      <HeaderComponent
        brand={brand}
        model={model}
        sellingPrice={price}
        category={category}
      />
      <DiscountComponent sellingPrice={price} listingPrice={initial_price} />
      <div className={css["short-description-container"]}>
        {short_description}
      </div>
      <SizeDropdown
        onSelectSize={onSelectSize}
        stockArray={stock_array}
        selectedSize={selectedSize}
      />
      <div className={css["user-action-container"]}>
        <GeneralTextButton
          onClick={() => {
            NotReadyYet();
            setSelectedSize(null);
            console.log(
              "add to cart, ",
              "product id: ",
              id,
              "selected size: ",
              selectedSize
            );
          }}
          displayedText="Add to cart"
          classProp={["addToCart"]}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
