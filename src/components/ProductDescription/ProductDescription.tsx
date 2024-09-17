import {FC, useState} from "react";
import css from "./ProductDescription.module.scss";
import GeneralTextButton from "../buttons/GeneralTextButton";
import HeaderComponent from "./HeaderComponent";
import DiscountComponent from "./DiscountComponent";
import SizeDropdown from "../dropdowns/SizeDropdown";
import useCart from "../../hooks/useCart";

interface Props {
  currentProduct: ProductExtraDataResponse;
}

const ProductDescription: FC<Props> = ({currentProduct}) => {
  const {
    product_id,
    model,
    brand,
    price,
    initial_price,
    category,
    stock_array,
    short_description,
  } = currentProduct;

  const [selectedSize, setSelectedSize] = useState<null | string>(null);

  const cart = useCart();
  const {updateCart, items, loaderState} = cart;

  const onSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const currentSizeMaxQuantity = () => {
    const currentSizeObject = stock_array.find((obj) => {
      return obj.size === selectedSize;
    });
    if (currentSizeObject) {
      return currentSizeObject.count;
    } else return 0;
  };

  const currentSizeCartQuantity = () => {
    if (items) {
      const currentSizeObject = items.find((obj) => {
        return obj.id === product_id && obj.size === selectedSize;
      });

      if (currentSizeObject) {
        return currentSizeObject.quantity;
      } else return 0;
    } else return 0;
  };

  const onAddToCart = () => {
    if (selectedSize) {
      if (items) {
        const currentObject = items.find((obj) => {
          return obj.id === product_id && obj.size === selectedSize;
        });
        if (currentObject) {
          if (currentObject.quantity < currentObject.itemData.max_order) {
            void updateCart(
              product_id,
              selectedSize,
              currentObject.quantity + 1,
              "update"
            );
          } else {
            void updateCart(
              product_id,
              selectedSize,
              currentObject.quantity + 1,
              "unavaiable"
            );
          }
        } else {
          void updateCart(product_id, selectedSize, 1, "add");
        }
      } else {
        void updateCart(product_id, selectedSize, 1, "add");
      }
    }
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
          onClick={onAddToCart}
          displayedText="Add to cart"
          classProp={["add-to-cart"]}
          isLoading={Boolean(loaderState === "addToCart")}
          isDisabled={Boolean(
            currentSizeCartQuantity() >= currentSizeMaxQuantity()
          )}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
