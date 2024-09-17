import {FC, useState} from "react";
import css from "./CartProductThumbnailLarge.module.scss";
import {Link} from "react-router-dom";
import GeneralTextButton from "../../buttons/GeneralTextButton";
import AccessibleFigure from "../../AccessibleFigure";
import CountDropdown from "../../dropdowns/CountDropdown";

interface CartProductItem {
  id: string;
  size: string;
  quantity: number;
  itemData: ItemData;
}

interface ItemData {
  brand: string;
  model: string;
  gender: string;
  price: number;
  thumbnail: string;
  max_order: number;
}

interface Props {
  onDeleteItem: (product_id: string, product_size: string) => void;
  onUpdateQuantity: (
    product_id: string,
    product_size: string,
    quantity: number
  ) => void;
  cartProductEntryWithData: CartProductItem;
  activeDropdown: string | null;
  onClickDropdown: (id: string | null) => void;
  isDropdownLoading: boolean;
  isDeleteButtonLoading: boolean;
}

const CartProductThumbnailLarge: FC<Props> = (props) => {
  const {
    onDeleteItem,
    onUpdateQuantity,
    cartProductEntryWithData,
    onClickDropdown,
    activeDropdown,
    isDropdownLoading,
    isDeleteButtonLoading,
  } = props;
  const {id, size, quantity} = cartProductEntryWithData;
  const {brand, model, gender, price, thumbnail, max_order} =
    cartProductEntryWithData.itemData;
  const [isLoading, setIsLoading] = useState(true);

  const onChooseNewQuantity = (newQuantity: number) => {
    onUpdateQuantity(id, size, newQuantity);
  };

  const subtotal = (
    Math.round(price * cartProductEntryWithData.quantity * 100) / 100
  ).toFixed(2);

  const onLoad = (p: boolean) => {
    setIsLoading(p);
  };

  return (
    <div className={css["component-container"]}>
      <div className={css["product-thumbnail-container"]}>
        <AccessibleFigure
          thumbnailUrl={thumbnail}
          hoverActions={false}
          isLoading={isLoading}
          onLoad={onLoad}
          classDefinition="class-set-3"
          swiperComponent={false}
        />
      </div>
      <div className={css["major-container"]}>
        <div className={css["description-container"]}>
          <div className={css["top-text-container"]}>
            <Link className={css["link-to-product"]} to={`/product/${id}`}>
              <div className={css["bold-product-data-top"]}>{brand}</div>
              <div className={css["bold-product-data-top"]}>{model}</div>
            </Link>
          </div>
          <div className={css["bottom-text-container"]}>
            <div className={css["light-product-data-bottom"]}>
              Gender: {gender}
            </div>
            <div className={css["light-product-data-bottom"]}>
              Article No: {id}
            </div>
            <div className={css["bold-product-data-bottom"]}>
              SIZE {cartProductEntryWithData.size}
            </div>
          </div>
        </div>
        <div className={css["user-action-container"]}>
          <div className={css["price-container"]}>
            <div className={css["product-total-price"]}>${subtotal}</div>
            <div
              className={css["single-item-price"]}
            >{`Single item price: $${(Math.round(price * 100) / 100).toString()}`}</div>
          </div>
          <CountDropdown
            onSelectQuantity={onChooseNewQuantity}
            selectedQuantity={quantity}
            maxOrder={max_order}
            onClickDropdown={onClickDropdown}
            activeDropdown={activeDropdown}
            dropdownId={`${id}__${size}`}
            isLoading={isDropdownLoading}
          />
          <div className={css["delete-item-wrapper"]}>
            <GeneralTextButton
              displayedText="DELETE ITEM"
              classProp={["delete-item"]}
              onClick={() => {
                onDeleteItem(id, size);
              }}
              isLoading={isDeleteButtonLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductThumbnailLarge;
