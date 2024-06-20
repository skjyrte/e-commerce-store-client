import {FC, useState, useRef, useEffect} from "react";
import css from "./CategoryProductThumbnail.module.scss";
import classNames from "classnames";
import IconNoPhoto from "../../icons/IconNoPhoto";

type Props = {product: Product};

const CategoryProductThumbnail: FC<Props> = ({
  product: {id, model, price, brand, thumbnail, initialPrice, stock},
}) => {
  const [hovered, setHovered] = useState(false);
  const [height, setHeight] = useState(0);

  const toggleHover = () => setHovered(!hovered);

  const sizesStyle = {
    "--getSizesHeight": `${height}px`,
  } as React.CSSProperties;

  const elementRef = useRef<HTMLDivElement>(null);

  const sizeArray = stock.map((el) => (
    <div
      key={el.size}
      className={classNames(css.sizeField, el.count > 0 ? "" : css.outOfStock)}
    >
      {el.size}
    </div>
  ));

  useEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    const observer = new ResizeObserver(() => {
      if (elementRef.current !== null) {
        setHeight(elementRef.current.offsetHeight);
      }
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

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
        style={sizesStyle}
      ></div>
      <div className={classNames(css.content, hovered ? css.hovered : "")}>
        <div className={css.cardImageBox}>
          {thumbnail ? (
            <img
              className={classNames(
                css.thumbnailImageImg,
                hovered ? css.hovered : ""
              )}
              src={thumbnail}
            />
          ) : (
            <IconNoPhoto />
          )}
        </div>
        <div className={classNames(css.brand, css.rowContainer)}>{brand}</div>
        <div className={classNames(css.model, css.rowContainer)}>{model}</div>
        <div className={classNames(css.priceBox, css.rowContainer)}>
          <div className={classNames(css.price, css.rowContainer)}>
            ${price.toFixed(2)}
          </div>
          <div className={classNames(css.initialPrice, css.rowContainer)}>
            ${initialPrice.toFixed(2)}
          </div>
        </div>
      </div>
      <div
        className={classNames(css.sizeBox, hovered ? css.hovered : css.hide)}
        ref={elementRef}
      >
        {sizeArray}
      </div>
    </div>
  );
};

export default CategoryProductThumbnail;
