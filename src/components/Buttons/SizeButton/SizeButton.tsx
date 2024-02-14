import {FC} from "react";
import css from "./SizeButton.module.scss";
import NarrowArrowNext from "../../Icons/NarrowArrowNext";

type Props = {
  onClick: () => void;
  currentSize: string | null;
};

const SizeButton: FC<Props> = ({onClick, currentSize}) => {
  return (
    <button onClick={onClick} className={css.SizeButton}>
      <div className={css.Size}>{currentSize}</div>
      <div className={css.icon}>
        <NarrowArrowNext />
      </div>
    </button>
  );
};

export default SizeButton;
