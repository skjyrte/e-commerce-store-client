import {FC, useState} from "react";
import css from "./ProductGallery.module.scss";

type Props = {
  imagesList: Array<any>;
};

const ProductGallery: FC<Props> = ({imagesList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageArray = imagesList.map((element, index) => (
    <li
      className={`${css.mainImageList} ${index === currentIndex ? css.current : ""} `}
      draggable="false"
    >
      <img
        className={`${css.mainImage} ${index === currentIndex ? css.current : ""} `}
        src={element}
        draggable="false"
      />
    </li>
  ));

  const displayThumbnail = (index: number) => {
    setCurrentIndex(index);
  };

  const thumbnailArray = imagesList.map((element, index) => {
    console.log(element);
    return (
      <li
        className={`${css.thumbnailList} ${index === currentIndex ? css.currentThumbnail : ""}`}
        key={index}
        draggable="false"
        style={{backgroundImage: `url(${element})`}}
        onClick={() => setCurrentIndex(index)}
      ></li>
    );
  });

  const chooseIndex = (buttonType: string) => {
    if (buttonType === "next") {
      setCurrentIndex(
        currentIndex < imagesList.length - 1 ? currentIndex + 1 : 0
      );
    } else if (buttonType === "prev") {
      setCurrentIndex(
        currentIndex > 0 ? currentIndex - 1 : imagesList.length - 1
      );
    } else throw new Error("invalid index");
    console.log(currentIndex);
  };

  return (
    <div className={`${css.componentBox} ${css.preventSelect}`}>
      <div className={css.mainImageBox}>
        <button
          className={`${css.carouselButton} ${css.prev}`}
          onClick={() => chooseIndex("prev")}
        >
          ⇐
        </button>
        <button
          className={`${css.carouselButton} ${css.next}`}
          onClick={() => chooseIndex("next")}
        >
          ⇒
        </button>
        {imageArray};
      </div>
      <div className={css.thumbnailBoxOverflow}>
        <ul
          style={{transform: `translate(${currentIndex * -70}px)`}}
          className={css.thumbnailBox}
        >
          {thumbnailArray}
        </ul>
      </div>
    </div>
  );
};

export default ProductGallery;
