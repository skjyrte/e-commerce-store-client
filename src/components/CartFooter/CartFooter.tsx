import {FC} from "react";
import css from "./CartFooter.module.scss";

interface Props {
  shippingTotal: number;
  subtotal: number;
}

const CartFooter: FC<Props> = (props) => {
  const {shippingTotal, subtotal} = props;
  const shippingTotalFormatted = (
    Math.round(shippingTotal * 100) / 100
  ).toFixed(2);

  const costTotalFormatted = (Math.round(subtotal * 100) / 100).toFixed(2);
  return (
    <div className={css.CartFooter}>
      <div className={css.shippingBox}>
        <div className={css.shipping}>Shipping</div>
        <div className={css.shippingTotal}>${shippingTotalFormatted}</div>
      </div>
      <div className={css.priceBox}>
        <div className={css.price}>Total (incl. VAT)</div>
        <div className={css.priceTotal}>${costTotalFormatted}</div>
      </div>
    </div>
  );
};

export default CartFooter;
