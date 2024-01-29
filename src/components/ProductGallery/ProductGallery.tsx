import {FC, useState} from "react";
import css from "./ProductGallery.module.scss";
import IconButton from "../Buttons/IconButton";
import IconTextButton from "../Buttons/IconTextButton";
import NarrowArrowNext from "../Icons/NarrowArrowNext";
import NarrowArrowPrev from "../Icons/NarrowArrowPrev";
import DotCounter from "../DotCounter";
import PictureLandscape from "../Icons/PictureLandscape";

type Props = {
  imagesList: Array<string>;
};

type ThumbnailSettings = {
  thumbnailWidth: number;
  thumbnailCountPerView: number;
  thumbnailOffsetMin: number;
  thumbnailOffsetStep: number;
  thumbnailOffsetMax: number;
};

const ProductGallery: FC<Props> = ({imagesList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailCurrentOffset, setThumbnailCurrentOffset] = useState(0);

  const mainImageArray = imagesList.map((element, index) => (
    <li
      className={`${css.mainImageElement} ${index === currentIndex ? css.current : ""} `}
      draggable="false"
      /*       style={{backgroundImage: `url(${element})`}} */
      key={index.toString()}
    >
      {" "}
      <img src={`${element}`} />{" "}
    </li>
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

  const thumbnailSettings = {
    thumbnailWidth: 100,
    /* container MUST have exactly 'thumbnailCountPerView' width */
    thumbnailCountPerView: 4,
    thumbnailOffsetMin: 0,
    get thumbnailOffsetStep() {
      return this.thumbnailCountPerView * this.thumbnailWidth;
    },
    get thumbnailOffsetMax() {
      return (
        (imagesList.length - this.thumbnailCountPerView) * this.thumbnailWidth
      );
    },
  };

  const checkThumbnailLimits = (
    direction: string,
    stepMultiplier = 1,
    thumbnailSettings: ThumbnailSettings
  ) => {
    const {thumbnailOffsetMin, thumbnailOffsetStep, thumbnailOffsetMax} =
      thumbnailSettings;

    if (direction === "next") {
      const calculatedOffset =
        thumbnailCurrentOffset + thumbnailOffsetStep * stepMultiplier <=
        thumbnailOffsetMax
          ? thumbnailCurrentOffset + thumbnailOffsetStep * stepMultiplier
          : thumbnailOffsetMax;
      return calculatedOffset >= thumbnailOffsetMin
        ? calculatedOffset
        : thumbnailOffsetMin;
    }
    if (direction === "prev") {
      const calculatedOffset =
        thumbnailCurrentOffset - thumbnailOffsetStep * stepMultiplier >=
        thumbnailOffsetMin
          ? thumbnailCurrentOffset - thumbnailOffsetStep * stepMultiplier
          : thumbnailOffsetMin;
      return calculatedOffset <= thumbnailOffsetMax
        ? calculatedOffset
        : thumbnailOffsetMax;
    } else throw new Error("invalid index");
  };

  const onSlideMainImage = (
    direction: string,
    thumbnailSettings: ThumbnailSettings
  ) => {
    const {thumbnailWidth, thumbnailCountPerView, thumbnailOffsetStep} =
      thumbnailSettings;

    if (direction === "next") {
      setCurrentIndex((currentIndex) => {
        return currentIndex < imagesList.length - 1
          ? currentIndex + 1
          : imagesList.length - 1;
      });
      const stepMultiplierNext = Math.floor(
        ((currentIndex + 1) * thumbnailWidth - thumbnailCurrentOffset) /
          thumbnailOffsetStep
      );
      if (
        thumbnailCurrentOffset <=
          (currentIndex + 1) * thumbnailWidth - thumbnailOffsetStep ||
        thumbnailCurrentOffset > (currentIndex + 1) * thumbnailWidth
      ) {
        setThumbnailCurrentOffset(() =>
          checkThumbnailLimits("next", stepMultiplierNext, thumbnailSettings)
        );
      }
    } else if (direction === "prev") {
      setCurrentIndex((currentIndex) =>
        currentIndex > 0 ? currentIndex - 1 : 0
      );
      const stepMultiplierPrev = Math.floor(
        (thumbnailCurrentOffset -
          (currentIndex - thumbnailCountPerView) * thumbnailWidth) /
          thumbnailOffsetStep
      );
      if (
        thumbnailCurrentOffset >=
          (currentIndex + 1 + thumbnailCountPerView) * thumbnailWidth -
            thumbnailOffsetStep ||
        thumbnailCurrentOffset < (currentIndex + 1) * thumbnailWidth
      ) {
        setThumbnailCurrentOffset(() =>
          checkThumbnailLimits("prev", stepMultiplierPrev, thumbnailSettings)
        );
      }
    } else throw new Error("invalid index");
  };

  const onSlideThumbnail = (direction: string) => {
    if (direction === "next") {
      setThumbnailCurrentOffset(
        checkThumbnailLimits("next", 1, thumbnailSettings)
      );
    } else if (direction === "prev") {
      setThumbnailCurrentOffset(
        checkThumbnailLimits("prev", 1, thumbnailSettings)
      );
    } else throw new Error("invalid index");
  };

  const thumbnailCountRemaining = (
    direction: string,
    thumbnailSettings: ThumbnailSettings
  ) => {
    const {thumbnailWidth, thumbnailCountPerView} = thumbnailSettings;
    if (direction === "prev") {
      return `${Math.floor(thumbnailCurrentOffset / thumbnailWidth)}`;
    } else if (direction === "next") {
      return `${Math.floor((imagesList.length * thumbnailWidth - thumbnailCurrentOffset) / thumbnailWidth) - thumbnailCountPerView}`;
    } else throw new Error("invalid index");
  };

  const disableThumbnailBtn = (
    direction: string,
    thumbnailSettings: ThumbnailSettings
  ) => {
    const {thumbnailOffsetMin, thumbnailOffsetMax} = thumbnailSettings;
    if (direction === "prev") {
      return thumbnailCurrentOffset === thumbnailOffsetMin ? true : false;
    } else if (direction === "next") {
      return thumbnailCurrentOffset === thumbnailOffsetMax ? true : false;
    } else throw new Error("invalid index");
  };

  return (
    <div className={`${css.componentBox} ${css.preventSelect}`}>
      <div className={css.mainImageBox}>
        <IconButton
          IconComponent={NarrowArrowPrev}
          buttonClass={["carouselButton", "prev"]}
          onClick={() => onSlideMainImage("prev", thumbnailSettings)}
          isDisabled={currentIndex === 0 ? true : false}
        />
        <IconButton
          IconComponent={NarrowArrowNext}
          buttonClass={["carouselButton", "next"]}
          onClick={() => onSlideMainImage("next", thumbnailSettings)}
          isDisabled={currentIndex === imagesList.length - 1 ? true : false}
        />
        {mainImageArray};
      </div>
      <DotCounter currentItem={currentIndex} totalItem={imagesList.length} />
      <div className={css.thumbnailBoxWrapper}>
        <IconTextButton
          IconComponent={PictureLandscape}
          buttonClass={["carouselButton"]}
          onClick={() => onSlideThumbnail("prev")}
          isDisabled={disableThumbnailBtn("prev", thumbnailSettings)}
          displayedText={thumbnailCountRemaining("prev", thumbnailSettings)}
        />
        <div className={css.thumbnailBoxOverflow}>
          <ul
            style={{
              transform: `translate(${-thumbnailCurrentOffset}px)`,
            }}
            className={css.thumbnailBox}
          >
            {thumbnailArray}
          </ul>
        </div>
        <IconTextButton
          IconComponent={PictureLandscape}
          buttonClass={["carouselButton"]}
          onClick={() => onSlideThumbnail("next")}
          isDisabled={disableThumbnailBtn("next", thumbnailSettings)}
          displayedText={thumbnailCountRemaining("next", thumbnailSettings)}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
