import {FC, useState} from "react";
import css from "./ProductGallery.module.scss";
import IconButton from "../Buttons/IconButton";
import IconTextButton from "../Buttons/IconTextButton";
import NarrowArrowNext from "../Icons/NarrowArrowNext";
import NarrowArrowPrev from "../Icons/NarrowArrowPrev";
import DotCounter from "../DotCounter";
import PictureLandscape from "../Icons/PictureLandscape";
import {createPortal} from "react-dom";

type Props = {
  imagesList: Array<string>;
};

const ProductGallery: FC<Props> = ({imagesList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentThumbnailXOffset, setCurrentThumbnailXOffset] = useState(0);

  const mainImageArray = imagesList.map((element, index) => (
    <li
      className={`${css.mainImageList} ${index === currentIndex ? css.current : ""} `}
      draggable="false"
      style={{backgroundImage: `url(${element})`}}
      key={index.toString()}
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
        id={index.toString()}
      />
    );
  });

  const minThumbnailXOffset = 0;
  const maxThumbnailXOffset = 800;
  const thumbnailXOffsetStep = 400;
  const thumbnailWidth = 100;

  const checkThumbnailLimits = (direction: string, stepMultiplier = 1) => {
    if (direction === "next") {
      return currentThumbnailXOffset + thumbnailXOffsetStep * stepMultiplier <=
        maxThumbnailXOffset
        ? currentThumbnailXOffset + thumbnailXOffsetStep * stepMultiplier
        : maxThumbnailXOffset;
    }
    if (direction === "prev") {
      return currentThumbnailXOffset - thumbnailXOffsetStep * stepMultiplier >=
        minThumbnailXOffset
        ? currentThumbnailXOffset - thumbnailXOffsetStep * stepMultiplier
        : minThumbnailXOffset;
    } else throw new Error("invalid index");
  };

  const onSlideMainImage = (direction: string) => {
    if (direction === "next") {
      setCurrentIndex((currentIndex) => {
        return currentIndex < imagesList.length - 1
          ? currentIndex + 1
          : imagesList.length - 1;
      });
      const stepMultiplierNext = Math.floor(
        ((currentIndex + 1) * thumbnailWidth - currentThumbnailXOffset) /
          thumbnailXOffsetStep
      );
      if (
        currentThumbnailXOffset <=
          //slider custom parameter
          (currentIndex + 1) * thumbnailWidth - thumbnailXOffsetStep ||
        currentThumbnailXOffset > (currentIndex + 1) * thumbnailWidth
      ) {
        setCurrentThumbnailXOffset(() =>
          checkThumbnailLimits("next", stepMultiplierNext)
        );
      }
    } else if (direction === "prev") {
      setCurrentIndex((currentIndex) =>
        currentIndex > 0 ? currentIndex - 1 : 0
      );
      const stepMultiplierPrev = Math.floor(
        (currentThumbnailXOffset - (currentIndex - 4) * thumbnailWidth) /
          thumbnailXOffsetStep
      );
      if (
        currentThumbnailXOffset >=
          //slider custom parameter
          (currentIndex + 4) * thumbnailWidth - thumbnailXOffsetStep ||
        currentThumbnailXOffset < (currentIndex + 1) * thumbnailWidth
      ) {
        setCurrentThumbnailXOffset(() =>
          checkThumbnailLimits("prev", stepMultiplierPrev)
        );
      }
    } else throw new Error("invalid index");
  };

  const onSlideThumbnail = (direction: string) => {
    if (direction === "next") {
      setCurrentThumbnailXOffset(checkThumbnailLimits("next"));
    } else if (direction === "prev") {
      setCurrentThumbnailXOffset(checkThumbnailLimits("prev"));
    } else throw new Error("invalid index");
  };

  return (
    <div className={`${css.componentBox} ${css.preventSelect}`}>
      <div className={css.mainImageBox}>
        {createPortal(
          <div className={css.portal}>
            This child is placed in the document body.
          </div>,
          document.body
        )}
        <IconButton
          IconComponent={NarrowArrowPrev}
          buttonClass={["carouselButton", "prev"]}
          onClick={() => onSlideMainImage("prev")}
          isDisabled={currentIndex === 0 ? true : false}
        />
        <IconButton
          IconComponent={NarrowArrowNext}
          buttonClass={["carouselButton", "next"]}
          onClick={() => onSlideMainImage("next")}
          isDisabled={currentIndex === imagesList.length - 1 ? true : false}
        />
        {mainImageArray};
      </div>
      <DotCounter currentItem={currentIndex} totalItem={imagesList.length} />
      <div className={css.thumbnailBoxWrapper}>
        <IconTextButton
          IconComponent={PictureLandscape}
          buttonClass={["carouselButton", "prev"]}
          onClick={() => onSlideThumbnail("prev")}
          isDisabled={
            currentThumbnailXOffset === minThumbnailXOffset ? true : false
          }
          displayedText={`${Math.floor(currentThumbnailXOffset / thumbnailWidth)}`}
        />
        <div className={css.thumbnailBoxOverflow}>
          <ul
            style={{
              transform: `translate(${-currentThumbnailXOffset}px)`,
            }}
            className={css.thumbnailBox}
          >
            {thumbnailArray}
          </ul>
        </div>
        <IconTextButton
          IconComponent={PictureLandscape}
          buttonClass={["carouselButton", "next"]}
          onClick={() => onSlideThumbnail("next")}
          isDisabled={
            currentThumbnailXOffset === maxThumbnailXOffset ? true : false
          }
          displayedText={`${Math.floor((imagesList.length * thumbnailWidth - currentThumbnailXOffset - thumbnailXOffsetStep) / thumbnailWidth)}`}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
