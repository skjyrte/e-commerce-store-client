import {FC} from "react";
import css from "./Header.module.scss";
import TextLinkElement from "../LinkElements/TextLinkElement";
import IconButton from "../buttons/IconButton";
import CartLinkElement from "../LinkElements/CartLinkElement";
import IconUserProfile from "../icons/IconUserProfile";
import classNames from "classnames";
import {useLocation} from "react-router-dom";

const Header: FC = () => {
  const location = useLocation();

  return (
    <>
      <div className={classNames(css["main-header-container"])}>
        <ul className={classNames(css["choose-gender-list"])}>
          <li className={css["gender-button-wrapper"]}>
            <TextLinkElement
              displayedText="Men"
              path={"/men"}
              active={location.pathname.includes("/men")}
              size="medium"
              key={"li-1"}
            />
          </li>
          <li className={css["gender-button-wrapper"]}>
            <TextLinkElement
              displayedText="Women"
              path={"/women"}
              active={location.pathname.includes("/women")}
              size="medium"
              key={"li-2"}
            />
          </li>
        </ul>

        <div className={css["site-home-button-wrapper"]}>
          <TextLinkElement displayedText="SNEAKERS" path={"/"} size="large" />
        </div>

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
      </div>
      <div className={classNames(css["main-header-border-element"])}></div>
    </>
  );
};
export default Header;
