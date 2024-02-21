import {FC} from "react";
import css from "./CartThumbnailLarge.module.scss";
import {Link} from "react-router-dom";
import classNames from "classnames";
import ChangeAmountButton from "../Buttons/ChangeAmountButton";

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

const CartThumbnailLarge: FC<Props> = (props) => {
  const {onClick, cartProductEntryWithData} = props;

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
      <div className={css.CartThumbnailLarge}>
        <div className={css.cartProductThumbnail}>
          <img className={classNames()} src={getThumbnail()} />
        </div>
        <div className={css.textBox}>
          <div className={css.boldChildBox}>
            <Link
              onClick={onClick}
              className={css.cartProduct}
              to={`/${data.gender}/${data.id}`}
            >
              <div className={css.companyProdNameBox}>
                <div className={css.company}>{data.brand}</div>
                <div className={css.productName}>{data.model}</div>
              </div>
            </Link>
          </div>
          <div className={css.shadedChildBox}>
            <div className={css.additionalInfo}>
              <div className={css.gender}>Gender: {data.gender}</div>
              <div className={css.prodNo}>Article No: {data.id}</div>
            </div>
            <div className={css.productSize}>
              SIZE {cartProductEntryWithData.size}
            </div>
          </div>
        </div>
        <div className={css.actionBox}>
          <div className={css.priceBox}>
            <div className={css.subtotalPrice}>${subtotal}</div>
            <div
              className={css.itemPrice}
            >{`Single item price: $${subtotal}`}</div>
          </div>
          <div className={css.buttonGroupWrapper}>
            <ChangeAmountButton
              displayedText="-"
              onClick={() => {}}
              classProp={["left", "cart"]}
              isDisabled={false}
            />
            <div className={css.itemsCount}>{1}</div>
            <ChangeAmountButton
              displayedText="+"
              onClick={() => {}}
              classProp={["right", "cart"]}
              isDisabled={false}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CartThumbnailLarge;
