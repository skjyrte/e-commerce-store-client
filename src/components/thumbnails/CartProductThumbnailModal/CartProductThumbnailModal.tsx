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
  const {brand, model, gender, price, thumbnail, max_order} = product.itemData;

  const onLoad = (p: boolean) => {
    setIsLoading(p);
  };

  const subtotal = (Math.round(price * quantity * 100) / 100).toFixed(2);
  return (
    <Link className={css.cartProduct} to={`/product/${id}`}>
      <div className={css.cartProductThumbnail}>
        <AccessibleFigure
          thumbnailUrl={thumbnail}
          hoverActions={false}
          isLoading={isLoading}
          onLoad={onLoad}
          classDefinition="class-set-4"
          swiperComponent={false}
        />
      </div>
      <div className={css.textBox}>
        <div className={css.boldChildBox}>
          <div className={css.companyProdNameBox}>
            <div className={css.company}>{brand}</div>
            <div className={css.productName}>{model}</div>
          </div>
          <div className={css.price}>${subtotal}</div>
        </div>
        <div className={css.shadedChildBox}>
          <div className={css.productSize}>SIZE {size}</div>
          <div className={css.productCount}>COUNT: {quantity}</div>
        </div>
      </div>
    </Link>
  );
};

export default CartProductThumbnailModal;
