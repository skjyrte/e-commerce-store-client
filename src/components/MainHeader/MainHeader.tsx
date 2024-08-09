import {FC, useState} from "react";
import css from "./MainHeader.module.scss";
import TextLinkElement from "../LinkElements/TextLinkElement";
import IconButton from "../buttons/IconButton";
import CartLinkElement from "../LinkElements/CartLinkElement";
import IconUserProfile from "../icons/IconUserProfile";
import classNames from "classnames";
import MobileHeaderDrawer from "../drawers/MobileHeaderDrawer";
import DesktopHeaderDrawer from "../drawers/DesktopHeaderDrawer";

const Header: FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<null | "men" | "women">(
    null
  );

  const shutTheDrawer = () => {
    setActiveDrawer(null);
  };
  console.log("activeDrawer");
  console.log(activeDrawer);

  return (
    <>
      <div className={classNames(css["main-header-relative-container"])}>
        <div
          onMouseLeave={shutTheDrawer}
          className={classNames(
            css["main-header-absolute-container"],
            activeDrawer && css["drawer-active"]
          )}
        >
          <div className={css["main-header-first-row"]}>
            <div className={css["site-home-button-wrapper"]}>
              <TextLinkElement
                displayedText="SNEAKERS"
                path={"/"}
                size="large"
              />
            </div>

            <div className={css["drawer-wrapper"]}>
              <MobileHeaderDrawer />
            </div>
            <ul className={classNames(css["choose-gender-list"])}>
              <li
                onMouseOver={() => {
                  if (activeDrawer !== "men") {
                    setActiveDrawer(null);
                    setTimeout(() => {
                      setActiveDrawer("men");
                    }, 200);
                  }
                }}
                className={css["gender-button-wrapper"]}
              >
                <TextLinkElement
                  displayedText="Men"
                  path={"/men"}
                  active={activeDrawer === "men"}
                  size="medium"
                  key={"li-1"}
                />
              </li>
              <li
                onMouseOver={() => {
                  if (activeDrawer !== "women") {
                    setActiveDrawer(null);
                    setTimeout(() => {
                      setActiveDrawer("women");
                    }, 200);
                  }
                }}
                className={css["gender-button-wrapper"]}
              >
                <TextLinkElement
                  displayedText="Women"
                  path={"/women"}
                  active={activeDrawer === "women"}
                  size="medium"
                  key={"li-2"}
                />
              </li>
            </ul>

            <div className={css["user-action-container"]}>
              <div className={css["cart-button-wrapper"]}>
                <CartLinkElement />
              </div>
              <div className={css["user-profile-button-wrapper"]}>
                <IconButton
                  IconComponent={IconUserProfile}
                  onClick={() => {
                    console.log("user profile");
                  }}
                  buttonClass={["profileButton"]}
                />
              </div>
            </div>
            <DesktopHeaderDrawer
              categoryList={["sneakers", "running", "casual", "outdoor"]}
              activeGender={activeDrawer}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
