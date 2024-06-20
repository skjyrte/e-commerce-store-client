import {FC} from "react";
import css from "./CartProductThumbnailModal.module.scss";
import {Link} from "react-router-dom";
import IconNoPhoto from "../../icons/IconNoPhoto";

type CartProductEntryWithData = {
  id: string;
  size: string;
  count: number;
  additionalData: Product | null;
};

type Props = {
  cartProductEntryWithData: CartProductEntryWithData;
};

const CartProductThumbnailModal: FC<Props> = (props) => {
  const {cartProductEntryWithData} = props;

  const data = cartProductEntryWithData.additionalData;

  if (data === null) {
    return (
      <div className="isError">
        Unable to get the product data. Please reload the page or contact us.
      </div>
    );
  } else {
    const subtotal = (
      Math.round(data.price * cartProductEntryWithData.count * 100) / 100
    ).toFixed(2);
    return (
      <Link className={css.cartProduct} to={`/${data.gender}/${data.id}`}>
        <div className={css.cartProductThumbnail}>
          {data.thumbnail ? <img src={data.thumbnail} /> : <IconNoPhoto />}
        </div>
        <div className={css.textBox}>
          <div className={css.boldChildBox}>
            <div className={css.companyProdNameBox}>
              <div className={css.company}>{data.brand}</div>
              <div className={css.productName}>{data.model}</div>
            </div>
            <div className={css.price}>${subtotal}</div>
          </div>
          <div className={css.shadedChildBox}>
            <div className={css.productSize}>
              SIZE {cartProductEntryWithData.size}
            </div>
            <div className={css.productCount}>
              COUNT: {cartProductEntryWithData.count}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default CartProductThumbnailModal;
