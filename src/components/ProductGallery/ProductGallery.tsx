import {FC, useState} from "react";
import css from "./ProductGallery.module.scss";
import IconButton from "../buttons/IconButton";
import IconTextButton from "../buttons/IconTextButton";
import IconNarrowArrowPrev from "../icons/IconNarrowArrowPrev";
import IconNarrowArrowNext from "../icons/IconNarrowArrowNext";
import DotCounter from "../DotCounter";
import IconPictureLandscape from "../icons/IconPictureLandscape";

type Props = {
  imagesList: Array<string>;
  onClickZoom?: () => void;
};

type ThumbnailSettings = {
  thumbnailWidth: number;
  thumbnailCountPerView: number;
  thumbnailOffsetMin: number;
  thumbnailOffsetStep: number;
  thumbnailOffsetMax: number;
};

const ProductGallery: FC<Props> = ({imagesList, onClickZoom}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [thumbnailCurrentOffset, setThumbnailCurrentOffset] =
    useState<number>(0);

  const images = imagesList;

  const thumbnailArray = images.map((element, index) => {
    return (
      <li
        className={`${css.thumbnailList} ${index === currentIndex ? css.currentThumbnail : ""}`}
        key={index}
        draggable="false"
        onClick={() => setCurrentIndex(index)}
        id={index.toString()}
      >
        <img key={currentIndex} src={element} />
      </li>
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
      return (images.length - this.thumbnailCountPerView) * this.thumbnailWidth;
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
        return currentIndex < images.length - 1
          ? currentIndex + 1
          : images.length - 1;
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
      return `${Math.floor((images.length * thumbnailWidth - thumbnailCurrentOffset) / thumbnailWidth) - thumbnailCountPerView}`;
    } else throw new Error("invalid index");
  };

  const disableThumbnailBtn = (
    direction: string,
    thumbnailSettings: ThumbnailSettings
  ) => {
    const {thumbnailOffsetMin, thumbnailOffsetMax} = thumbnailSettings;
    if (direction === "prev") {
      return thumbnailCurrentOffset === thumbnailOffsetMin;
    } else if (direction === "next") {
      return thumbnailCurrentOffset === thumbnailOffsetMax;
    } else throw new Error("invalid index");
  };

  return (
    <div className={`${css.componentBox} ${css.preventSelect}`}>
      <div className={`${css.mainImageBox} ${onClickZoom ? css.zoom : ""}`}>
        <IconButton
          IconComponent={IconNarrowArrowPrev}
          buttonClass={["carouselButton", "prev"]}
          onClick={() => onSlideMainImage("prev", thumbnailSettings)}
          isDisabled={currentIndex === 0}
        />
        <IconButton
          IconComponent={IconNarrowArrowNext}
          buttonClass={["carouselButton", "next"]}
          onClick={() => onSlideMainImage("next", thumbnailSettings)}
          isDisabled={currentIndex === images.length - 1}
        />
        <img
          key={currentIndex}
          src={images[currentIndex]}
          onClick={onClickZoom}
        />
      </div>
      <DotCounter currentItem={currentIndex} totalItem={images.length} />
      <div className={css.thumbnailBoxWrapper}>
        <IconTextButton
          IconComponent={IconPictureLandscape}
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
          IconComponent={IconPictureLandscape}
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
