import css from "./KeyValueList.module.scss";
import {FC} from "react";

interface Props {
  keyValueArray?: {key: string; value: string}[];
}

const KeyValueList: FC<Props> = (props) => {
  const {keyValueArray} = props;
  const createListElement = (dt: string, dd: string) => {
    return (
      <div className={css["description-element"]}>
        <dt className={css["description-term-element"]}>
          {dt}
          {": "}
        </dt>
        <dd className={css["description-detail-element"]}>{dd}</dd>
      </div>
    );
  };

  const renderKeyValueList = () => {
    if (keyValueArray) {
      return keyValueArray.map((obj) => {
        return createListElement(obj.key, obj.value);
      });
    } else return <></>;
  };

  return <dl>{renderKeyValueList()}</dl>;
};

export default KeyValueList;
