import React, {useState, FC} from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import IconButton from "../../buttons/IconButton";
import IconHeader from "../../icons/IconHeader";
import css from "./HeaderDrawer.module.scss";
import classNames from "classnames";
import TextLinkElement from "../../LinkElements/TextLinkElement";
import IconCross from "../../icons/IconCross";

interface Props {
  classList?: string[];
}

const HeaderDrawer: FC<Props> = (props) => {
  const {classList} = props;

  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={classNames(
        css["header-drawer-container"],
        ...(classList ? classList.map((className) => css[className]) : "")
      )}
    >
      <div className={css["header-button"]}>
        <IconButton
          IconComponent={IconHeader}
          onClick={toggleDrawer}
          buttonClass={["header-button"]}
        />
      </div>

      <Drawer
        width={"min(100vw, 400px)"}
        className={css["drawer-component"]}
        open={visible}
        onClose={toggleDrawer}
        placement="left"
      >
        <div>
          <ul className={classNames(css["choose-gender-list"])}>
            <li onClick={toggleDrawer} className={css["gender-button-wrapper"]}>
              <TextLinkElement
                displayedText="Men"
                path={"/men"}
                active={location.pathname.includes("/men")}
                size="medium"
                key={"li-1"}
              />
            </li>
            <li onClick={toggleDrawer} className={css["gender-button-wrapper"]}>
              <TextLinkElement
                displayedText="Women"
                path={"/women"}
                active={location.pathname.includes("/women")}
                size="medium"
                key={"li-2"}
              />
            </li>
          </ul>
          <IconButton
            onClick={toggleDrawer}
            IconComponent={IconCross}
            buttonClass={["closeModalButton", "size"]}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderDrawer;
