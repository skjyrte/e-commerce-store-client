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
  componentType: "modal" | "main";
};

const CartThumbnail: FC<Props> = (props) => {
  const {onClick, cartProductEntryWithData, componentType} = props;

  const data = cartProductEntryWithData.additionalData;

  const getThumbnail = () => {
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
        onClick={onClick}
        className={css.cartProduct}
        to={`/${data.gender}/${data.id}`}
      >
        <div className={css.cartProductThumbnail}>
          <img className={classNames()} src={getThumbnail()} />
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
