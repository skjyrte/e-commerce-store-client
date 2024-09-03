import css from "./UserDataBox.module.scss";
import {FC, ElementType} from "react";
import GeneralTextButton from "../buttons/GeneralTextButton";

interface Props {
  IconComponent: ElementType;
  title: string;
  data: string;
}

const UserDataBox: FC<Props> = (props) => {
  const {IconComponent, title, data} = props;
  return (
    <div className={css["component-box"]}>
      <div className={css["major-content-warpper"]}>
        <div className={css["icon-wrapper"]}>
          <IconComponent />
        </div>
        <div className={css["data-wrapper"]}>
          <div className={css["prop-title-container"]}>{title}</div>
          <div className={css["user-data-container"]}>{data}</div>
        </div>
      </div>
      <div className={css["edit-button-wrapper"]}>
        <GeneralTextButton
          displayedText="Edit"
          classProp={["edit-button"]}
          onClick={() => {
            console.log("EDIT");
          }}
        />
      </div>
    </div>
  );
};

export default UserDataBox;
