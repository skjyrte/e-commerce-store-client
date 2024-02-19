import {FC} from "react";
import css from "./CartThumbnail.module.scss";
import {Link} from "react-router-dom";
import classNames from "classnames";

type CartProductEntryWithData = {
  id: string;
  size: string;
  count: number;
  additionalData: Product | null;
};

type Props = {
  onClick: () => void;
  cartProductEntryWithData: CartProductEntryWithData;
};

const CartThumbnail: FC<Props> = (props) => {
  const {onClick, cartProductEntryWithData} = props;

  const data = cartProductEntryWithData.additionalData;

  const getTempThumbnail = () => {
    if (data !== null) {
      return data.thumbnail;
    }
  };

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
      <Link
        key={cartProductEntryWithData.id}
        onClick={onClick}
        className={css.cartProduct}
        to={`/${data.gender}/${data.id}`}
      >
        <div className={css.cartProductThumbnail}>
          <img className={classNames()} src={getTempThumbnail()} />
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

export default CartThumbnail;
