import {FC, useState} from "react";
import css from "./ProductGallery.module.scss";
import IconButton from "../Buttons/IconButton";
import NarrowArrowNext from "../Icons/NarrowArrowNext";
import NarrowArrowPrev from "../Icons/NarrowArrowPrev";

type Props = {
  imagesList: Array<any>;
};

const ProductGallery: FC<Props> = ({imagesList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentThumbnailXOffset, setCurrentThumbnailXOffset] = useState(0);

  const mainImageArray = imagesList.map((element, index) => (
    <li
      className={`${css.mainImageList} ${index === currentIndex ? css.current : ""} `}
      draggable="false"
      style={{backgroundImage: `url(${element})`}}
    />
  ));

  const thumbnailArray = imagesList.map((element, index) => {
    return (
      <li
        className={`${css.thumbnailList} ${index === currentIndex ? css.currentThumbnail : ""}`}
        key={index}
        draggable="false"
        style={{backgroundImage: `url(${element})`}}
        onClick={() => setCurrentIndex(index)}
      />
    );
  });

  const minThumbnailXOffset = 0;
  const maxThumbnailXOffset = 350;
  const thumbnailXOffsetStep = 200;
  const thumbnailWidth = 100;

  const checkThumbnailSlide = (direction: string) => {
    if (direction === "next") {
      return currentThumbnailXOffset + thumbnailXOffsetStep <=
        maxThumbnailXOffset
        ? currentThumbnailXOffset + thumbnailXOffsetStep
        : maxThumbnailXOffset;
    }
    if (direction === "prev") {
      return currentThumbnailXOffset - thumbnailXOffsetStep >=
        minThumbnailXOffset
        ? currentThumbnailXOffset - thumbnailXOffsetStep
        : minThumbnailXOffset;
    } else throw new Error("invalid index");
  };

  const onSlideMainImage = (direction: string) => {
    console.log("currentIndex");
    console.log(currentIndex);
    console.log("currentThumbnailXOffset");
    console.log(currentThumbnailXOffset);
    if (direction === "next") {
      setCurrentIndex(() => {
        return currentIndex < imagesList.length - 1
          ? currentIndex + 1
          : imagesList.length - 1;
      });
      if (
        currentThumbnailXOffset <
          currentIndex * thumbnailWidth - thumbnailXOffsetStep &&
        currentThumbnailXOffset < maxThumbnailXOffset
      ) {
        setCurrentThumbnailXOffset(checkThumbnailSlide("next"));
      }
    } else if (direction === "prev") {
      setCurrentIndex(() => (currentIndex > 0 ? currentIndex - 1 : 0));

      if (
        currentThumbnailXOffset >
          currentIndex * thumbnailWidth - thumbnailXOffsetStep &&
        currentThumbnailXOffset > minThumbnailXOffset
      ) {
        setCurrentThumbnailXOffset(checkThumbnailSlide("prev"));
      }
    } else throw new Error("invalid index");
  };

  const onSlideThumbnail = (direction: string) => {
    if (direction === "next") {
      setCurrentThumbnailXOffset(checkThumbnailSlide("next"));
    } else if (direction === "prev") {
      setCurrentThumbnailXOffset(checkThumbnailSlide("prev"));
    } else throw new Error("invalid index");
  };

  return (
    <div className={`${css.componentBox} ${css.preventSelect}`}>
      <div className={css.mainImageBox}>
        <button
          className={`${css.carouselButton} ${css.prev}`}
          onClick={() => onSlideMainImage("prev")}
        >
          ⇐
        </button>
        <button
          className={`${css.carouselButton} ${css.next}`}
          onClick={() => onSlideMainImage("next")}
        >
          ⇒
        </button>
        {mainImageArray};
      </div>
      <div className={css.thumbnailBoxOverflow}>
        <IconButton
          IconComponent={NarrowArrowPrev}
          buttonClass={["carouselButton", "prev"]}
          onClick={() => onSlideThumbnail("prev")}
        />
        <ul
          style={{
            transform: `translate(${-currentThumbnailXOffset}px)`,
          }}
          className={css.thumbnailBox}
        >
          {thumbnailArray}
        </ul>
        <IconButton
          IconComponent={NarrowArrowNext}
          buttonClass={["carouselButton", "next"]}
          onClick={() => onSlideThumbnail("next")}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
