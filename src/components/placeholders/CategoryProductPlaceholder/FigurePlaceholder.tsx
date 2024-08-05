import {FC} from "react";
import css from "./FigurePlaceholder.module.scss";
import FigureLoaderComponent from "./Loaders/FigureLoaderComponent";

const FigurePlaceholder: FC = () => {
  return (
    <figure className={css["image-container"]}>
      <div className={css["loading-state-box"]}>
        <FigureLoaderComponent />
      </div>
    </figure>
  );
};

export default FigurePlaceholder;
