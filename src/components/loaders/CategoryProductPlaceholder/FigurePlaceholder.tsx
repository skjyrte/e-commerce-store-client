import {FC} from "react";
import css from "./FigurePlaceholder.module.scss";
import FigureLoader from "../FigureLoader";

const FigurePlaceholder: FC = () => {
  return (
    <figure className={css["image-container"]}>
      <div className={css["loading-state-box"]}>
        <FigureLoader />
      </div>
    </figure>
  );
};

export default FigurePlaceholder;
