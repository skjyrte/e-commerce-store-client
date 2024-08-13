import {FC, useState} from "react";
import css from "./CartProductThumbnailLarge.module.scss";
import {Link} from "react-router-dom";
import IconNoPhoto from "../../inlineIcons/IconNoPhoto";
import ChangeAmountButton from "../../buttons/ChangeAmountButton";
import GeneralTextButton from "../../buttons/GeneralTextButton";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/configureStore";

type CartProductEntryWithData = {
  id: string;
  size: string;
  count: number;
  additionalData: Product | null;
};

type Props = {
  saveCartHandler: (
    productId: string,
    selectedSize: string,
    changeBy: number
  ) => void;
  cartProductEntryWithData: CartProductEntryWithData;
};

const CartProductThumbnailLarge: FC<Props> = (props) => {
  const {saveCartHandler, cartProductEntryWithData} = props;
  const [editMode, setEditMode] = useState(false);
  const [newQuantity, setNewQuantity] = useState(
    cartProductEntryWithData.count
  );

  const data = cartProductEntryWithData.additionalData;

  const avaiableItems = useSelector((state: RootState) => {
    return state.response.value.products.find((product) => {
      return product.id === cartProductEntryWithData.id;
    });
  });

  const onChangeQuantity = (action: "increase" | "decrease") => {
    console.log("avaiableItems");
    console.log(avaiableItems);
    if (avaiableItems !== undefined) {
      const itemInStock = avaiableItems.stock.find((size) => {
        return size.size === cartProductEntryWithData.size;
      })?.count;
      if (itemInStock !== undefined) {
        const changeBy = newQuantity - cartProductEntryWithData.count;
        if (action === "increase" && changeBy < itemInStock) {
          setNewQuantity((prev) => prev + 1);
        }
        if (action === "decrease" && newQuantity > 0) {
          setNewQuantity((prev) => prev - 1);
        }
      }
    } else {
      throw new Error("no such product in database");
    }
  };

  const onClickEdit = () => {
    setEditMode(true);
    setNewQuantity(cartProductEntryWithData.count);
  };

  const onClickSave = () => {
    const changeBy = newQuantity - cartProductEntryWithData.count;
    saveCartHandler(
      cartProductEntryWithData.id,
      cartProductEntryWithData.size,
      changeBy
    );
    setEditMode(false);
  };

  const onClickDelete = () => {
    saveCartHandler(
      cartProductEntryWithData.id,
      cartProductEntryWithData.size,
      -1
    );
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
          {data.thumbnail ? <img src={data.thumbnail} /> : <IconNoPhoto />}
        </div>
        <div className={css.textBox}>
          <div className={css.boldChildBox}>
            <Link className={css.cartProduct} to={`/${data.gender}/${data.id}`}>
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
            >{`Single item price: $${Math.round(data.price * 100) / 100}`}</div>
          </div>
          <div className={css.deleteBox}>
            <GeneralTextButton
              displayedText="DELETE ITEM"
              classProp={["deleteItems"]}
              onClick={onClickDelete}
            />
          </div>
          {editMode === true ? (
            <div className={css.buttonGroupWrapper}>
              <GeneralTextButton
                displayedText="SAVE"
                classProp={["editItems"]}
                onClick={onClickSave}
              />
              <ChangeAmountButton
                displayedText="-"
                onClick={() => onChangeQuantity("decrease")}
                classProp={["left", "cart"]}
                isDisabled={false}
              />
              <div className={css.itemsCount}>{newQuantity}</div>
              <ChangeAmountButton
                displayedText="+"
                onClick={() => onChangeQuantity("increase")}
                classProp={["right", "cart"]}
                isDisabled={false}
              />
            </div>
          ) : (
            <div className={css.buttonGroupWrapper}>
              <div className={css.itemsCountTitle}>Count: </div>
              <div className={css.itemsCount}>
                {cartProductEntryWithData.count}
              </div>
              <GeneralTextButton
                displayedText="EDIT"
                classProp={["editItems"]}
                onClick={onClickEdit}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CartProductThumbnailLarge;
