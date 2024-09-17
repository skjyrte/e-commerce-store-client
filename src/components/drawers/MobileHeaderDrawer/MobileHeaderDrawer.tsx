import {useState, FC} from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import {motion, AnimatePresence} from "framer-motion";
import IconButton from "../../buttons/IconButton";
import IconHeader from "../../reactIcons/IconHeader";
import css from "./MobileHeaderDrawer.module.scss";
import classNames from "classnames";
import IconCross from "../../reactIcons/IconCross";
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

      <AnimatePresence>
        {visible && (
          <Drawer
            width={"min(100vw, 400px)"}
            className={css["drawer-component"]}
            open={visible}
            onClose={toggleDrawer}
            placement="left"
          >
            <motion.div
              variants={{
                hidden: {x: "-100%", opacity: 0},
                visible: {x: "0", opacity: 1},
                exit: {x: "-100%", opacity: 0},
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{duration: 0.1, ease: "easeInOut"}}
            >
              <header className={classNames(css["drawer-header"])}>
                Browse By Category
                <IconButton
                  onClick={toggleDrawer}
                  IconComponent={IconCross}
                  buttonClass={["close-modal"]}
                />
              </header>
              <div className={classNames(css["choose-gender-list-container"])}>
                <CategoryAccordion
                  categoryList={[
                    {
                      gender: "men",
                      categories: [
                        "all",
                        "sneakers",
                        "running",
                        "casual",
                        "outdoor",
                      ],
                    },
                    {
                      gender: "women",
                      categories: [
                        "all",
                        "sneakers",
                        "running",
                        "casual",
                        "outdoor",
                      ],
                    },
                  ]}
                  onCloseModal={toggleDrawer}
                />
              </div>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeaderDrawer;
