import {FC, useState} from "react";
import css from "./AccessibleFigure.module.scss";
import classNames from "classnames";
import FigureLoader from "../loaders/FigureLoader/FigureLoader";
import noPhotoIconUrl from "../../icons/IconNoPhoto.svg";

interface Props {
  thumbnailUrl: string;
  hoverActions: boolean;
  alt?: string;
  brand: string;
  model: string;
  isLoading: boolean;
  onLoad: (p: boolean) => void;
}

const Figure: FC<Props> = (props) => {
  const {
    thumbnailUrl,
    hoverActions,
    alt,
    brand,
    model,
    isLoading,
    onLoad,
    modal,
  } = props;
  const [hasError, setHasError] = useState(false);

  return (
    //NOTE - swiper-zoom-container class required by swiper
    <figure
      className={classNames(css["image-container"], "swiper-zoom-container")}
    >
      {isLoading && !hasError && (
        <div className={css["loading-state-box"]}>
          <FigureLoader />
        </div>
      )}
      {thumbnailUrl && !hasError ? (
        <img
          className={classNames(
            css["product-image"],
            hoverActions && css["hover-actions-state"],
            isLoading && css["loading-content"]
          )}
          src={thumbnailUrl}
          alt={alt ? alt : `${brand}'s ${model} product image`}
          onLoad={() => {
            setTimeout(() => {
              onLoad(false);
            }, Math.random() * 2000);
          }}
          onError={() => {
            setHasError(true);
          }}
        />
      ) : (
        <div
          className={classNames(
            css["thumbnail-placeholder-box"],
            hoverActions && css["hover-actions-state"]
          )}
        >
          <img
            src={noPhotoIconUrl}
            alt="No photo available"
            className={classNames(css["no-photo-image"])}
          />
        </div>
      )}
    </figure>
  );
};

export default Figure;
