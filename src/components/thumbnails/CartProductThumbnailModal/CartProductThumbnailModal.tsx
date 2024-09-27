import {FC, useState} from "react";
import css from "./CartProductThumbnailModal.module.scss";
import {Link} from "react-router-dom";
import AccessibleFigure from "../../AccessibleFigure";

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
  product: CartProductItem;
}

const CartProductThumbnailModal: FC<Props> = (props) => {
  const {product} = props;
  const [isLoading, setIsLoading] = useState(true);
  const {id, size, quantity} = product;
  const {brand, model, price, thumbnail} = product.itemData;

  const onLoad = (p: boolean) => {
    setIsLoading(p);
  };

  const subtotal = (Math.round(price * quantity * 100) / 100).toFixed(2);
  return (
    <Link className={css["cart-product"]} to={`/product/${id}`}>
      <div className={css["cart-product-thumbnail"]}>
        <AccessibleFigure
          thumbnailUrl={thumbnail}
          hoverActions={false}
          isLoading={isLoading}
          onLoad={onLoad}
          classDefinition="class-set-4"
          swiperComponent={false}
        />
      </div>
      <div className={css["text-box"]}>
        <div className={css["bold-child-box"]}>
          <div className={css["company-prod-name-box"]}>
            <div className={css.company}>{brand}</div>
            <div className={css["product-name"]}>{model}</div>
          </div>
          <div className={css.price}>${subtotal}</div>
        </div>
        <div className={css["shaded-child-box"]}>
          <div className={css["product-size"]}>SIZE {size}</div>
          <div className={css["product-count"]}>COUNT: {quantity}</div>
        </div>
      </div>
    </Link>
  );
};

export default CartProductThumbnailModal;
