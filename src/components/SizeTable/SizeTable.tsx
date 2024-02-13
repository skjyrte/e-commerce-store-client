import {FC} from "react";
import css from "./SizeTable.module.scss";
import AvailabilityBar from "../../components/AvailabilityBar";

type sizeObject = {size: string; count: number};

type Props = {
  sizesArray: sizeObject[];
};

const SizeTable: FC<Props> = ({sizesArray}) => {
  const sizeTableArray = sizesArray.map((obj) => {
    return (
      <div className={css.sizeField}>
        <div className={css.title}>{obj.size}</div>
        <div className={css.barWrapper}>
          <AvailabilityBar thresholds={[0, 2, 5, 7]} items={obj.count} />
        </div>
      </div>
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
