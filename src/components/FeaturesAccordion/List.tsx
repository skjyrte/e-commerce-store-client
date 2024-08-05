import css from "./List.module.scss";
import {FC} from "react";

interface Props {
  listArray?: string[];
}

const List: FC<Props> = (props) => {
  const {listArray} = props;
  const createListElement = (str: string) => {
    return (
      <div className={css["child-list-wrapper"]}>
        <li className={css["child-list-element"]}>{str}</li>
      </div>
    );
  };

  const renderList = () => {
    if (listArray) {
      return listArray.map((str) => {
        return createListElement(str);
      });
    } else return <></>;
  };

  return <ul className={css["ul-header-element"]}>{renderList()}</ul>;
};

export default List;
