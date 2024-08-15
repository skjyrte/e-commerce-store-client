import {useState, FC} from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import IconButton from "../../buttons/IconButton";
import IconHeader from "../../inlineIcons/IconHeader";
import css from "./MobileHeaderDrawer.module.scss";
import classNames from "classnames";
import IconCross from "../../inlineIcons/IconCross";
import CategoryAccordion from "../../accordions/CategoryAccordion";

interface Props {
  classList?: string[];
}

const MobileHeaderDrawer: FC<Props> = (props) => {
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
          <header className={classNames(css["drawer-header"])}>
            {" "}
            Browse By Category
            <IconButton
              onClick={toggleDrawer}
              IconComponent={IconCross}
              buttonClass={["closeModalButton", "size"]}
            />
          </header>
          <div className={classNames(css["choose-gender-list-container"])}>
            <CategoryAccordion
              categoryList={[
                {
                  gender: "men",
                  categories: ["sneakers", "running", "casual", "outdoor"],
                },
                {
                  gender: "women",
                  categories: ["sneakers", "running", "casual", "outdoor"],
                },
              ]}
              onCloseModal={toggleDrawer}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileHeaderDrawer;
