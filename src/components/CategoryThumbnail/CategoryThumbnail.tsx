import {FC, useState, useRef, useEffect} from "react";
import css from "./CategoryThumbnail.module.scss";
import classNames from "classnames";

type Props = {product: Product};

const CategoryThumbnail: FC<Props> = ({
  product: {id, title, price, brand, thumbnail, initialPrice, stock},
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
        ref={elementRef}
      >
        {sizeArray}
      </div>
    </div>
  );
};

export default CategoryThumbnail;
