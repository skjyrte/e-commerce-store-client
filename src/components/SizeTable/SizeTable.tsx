import {FC} from "react";
import css from "./SizeTable.module.scss";
import AvailabilityBar from "../../components/AvailabilityBar";
import classNames from "classnames";

type sizeObject = {size: string; count: number};

type Props = {
  sizesArray: sizeObject[];
  onClick: (size: string) => void;
};

const SizeTable: FC<Props> = ({sizesArray, onClick}) => {
  const sizeTableArray = sizesArray.map((obj, index) => {
    const isBtnDisabled = obj.count === 0 ? true : false;

    return (
      <button
        className={classNames(css.sizeButton)}
        onClick={() => onClick(obj.size)}
        disabled={isBtnDisabled}
        key={index}
      >
        <div className={css.title}>{obj.size}</div>
        <div className={css.barWrapper}>
          {obj.count < 3 && obj.count > 0 ? (
            <div className={css.lowStockWarning}>
              {obj.count} item{obj.count === 1 ? "" : "s"} left
            </div>
          ) : (
            <></>
          )}
          <AvailabilityBar thresholds={[0, 5, 10]} items={obj.count} />
        </div>
      </button>
    );
  });

  return (
    <div className={css.sizesTable}>
      <div className={css.sizesHeader}>Choose your size</div>
      <div className={css.sizeArrayWrapper}>{sizeTableArray}</div>
    </div>
  );
};

export default SizeTable;
