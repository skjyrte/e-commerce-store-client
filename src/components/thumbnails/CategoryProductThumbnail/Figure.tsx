import {FC, useState} from "react";
import css from "./Figure.module.scss";
import IconNoPhoto from "../../icons/IconNoPhoto";
import classNames from "classnames";
import FigureLoader from "./Loaders/FigureLoader";

interface Props {
  thumbnailUrl: string;
  hovered: boolean;
  alt?: string;
  brand: string;
  model: string;
  isLoading: boolean;
  onLoad: (p: boolean) => void;
}

const Figure: FC<Props> = (props) => {
  const {thumbnailUrl, hovered, alt, brand, model, isLoading, onLoad} = props;
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={css["image-container"]}>
      {isLoading && !hasError && (
        <div className={css["loading-state-box"]}>
          <FigureLoader />
        </div>
      )}
      {thumbnailUrl && !hasError ? (
        <img
          className={classNames(
            css["product-image"],
            hovered && css["hovered-state"],
            isLoading && css["loading-content"]
          )}
          src={thumbnailUrl}
          alt={alt ? alt : `${brand}'s ${model} product image`}
          onLoad={() => {
            //TODO - to be removed
            setTimeout(() => {
              onLoad(false);
            }, Math.random() * 2000);
          }}
          onError={() => {
            setHasError(true);
          }}
        />
      ) : (
        <div className={css["thumbnail-placeholder-box"]}>
          <IconNoPhoto />
        </div>
      )}
    </figure>
  );
};

export default Figure;
