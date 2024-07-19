import {FC, useState, useRef, useEffect} from "react";
import css from "./CategoryProductThumbnail.module.scss";
import classNames from "classnames";
import IconNoPhoto from "../../icons/IconNoPhoto";

interface Props {
  productData: ProductWithData;
  onHover: (id: null | string) => void;
  hovered: boolean;
}

const CategoryProductThumbnail: FC<Props> = ({
  productData: {id, brand, model, price, initial_price, thumbnail, stock},
  onHover,
  hovered,
}) => {
  const [height, setHeight] = useState(0);

  const sizesStyle = {
    "--getSizesHeight": `${height.toString()}px`,
  } as React.CSSProperties;

  const elementRef = useRef<HTMLDivElement>(null);

  const renderSizeBox = () => {
    let sizeArray = null;
    try {
      if (stock) {
        sizeArray = stock.map((el) => (
          <div
            key={el.size}
            className={classNames(
              css.sizeField,
              el.count > 0 ? "" : css.outOfStock
            )}
          >
            {el.size}
          </div>
        ));
      } else throw new Error("Size object undefined. Invalid props object");
    } catch {
      sizeArray = (
        <div className={classNames(css.sizeField, css.outOfStock)}>
          {"Not avaiable"}
        </div>
      );
    }
    return sizeArray;
  };

  useEffect(() => {
    const element = elementRef.current;

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
      onMouseEnter={() => {
        onHover(id);
      }}
      onMouseLeave={() => {
        onHover(null);
      }}
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
            ${price}
          </div>
          <div className={classNames(css.initialPrice, css.rowContainer)}>
            ${initial_price}
          </div>
        </div>
      </div>
      <div
        className={classNames(css.sizeBox, hovered ? css.hovered : css.hide)}
        ref={elementRef}
      >
        {renderSizeBox()}
      </div>
    </div>
  );
};

export default CategoryProductThumbnail;
