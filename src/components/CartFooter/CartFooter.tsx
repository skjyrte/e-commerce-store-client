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
    <div className={css["component-container"]}>
      <div className={css["shipping-data-container"]}>
        <div className={css["shipping-data"]}>Shipping</div>
        <div className={css["shipping-total-value"]}>
          ${shippingTotalFormatted}
        </div>
      </div>
      <div className={css["price-container"]}>
        <div className={css["price-header"]}>Total</div>
        <div className={css["total-cost-data"]}>${costTotalFormatted}</div>
      </div>
    </div>
  );
};

export default CartFooter;
