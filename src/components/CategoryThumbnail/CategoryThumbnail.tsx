import {FC, useState} from "react";
import css from "./CategoryThumbnail.module.scss";
import classNames from "classnames";

type Props = {product: Product};

const CategoryThumbnail: FC<Props> = ({
  product: {id, title, price, brand, thumbnail, initialPrice, stock},
}) => {
  const [hovered, setHovered] = useState(false);
  console.log(hovered);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div
      key={id}
      className={css.thumbnailBox}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div
        className={classNames(
          css.absoluteImageFrame,
          hovered ? css.hovered : ""
        )}
      ></div>
      <div className={classNames(css.content, hovered ? css.hovered : "")}>
        <div className={css.cardImageBox}>
          <img
            className={classNames(
              css.thumbnailImageImg,
              hovered ? css.hovered : ""
            )}
            src={thumbnail}
          />
        </div>
        <div className={classNames(css.brand, css.rowFlexContainer)}>
          {brand}
        </div>
        <div className={classNames(css.title, css.rowFlexContainer)}>
          {title}
        </div>
        <div className={classNames(css.priceBox, css.rowFlexContainer)}>
          <div className={classNames(css.price, css.rowFlexContainer)}>
            ${price.toFixed(2)}
          </div>
          <div className={classNames(css.initialPrice, css.rowFlexContainer)}>
            ${initialPrice.toFixed(2)}
          </div>
        </div>
      </div>
      <div
        className={classNames(css.sizeBox, hovered ? css.hovered : css.hide)}
      >
        <p className={css.sizeField}>12</p>
      </div>
    </div>
  );
};

export default CategoryThumbnail;
