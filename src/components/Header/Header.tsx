import {FC} from "react";
import css from "./Header.module.scss";
import TextLinkElement from "../LinkElements/TextLinkElement";
import IconButton from "../buttons/IconButton";
import CartLinkElement from "../LinkElements/CartLinkElement";
import IconUserProfile from "../icons/IconUserProfile";

const Header: FC = ({}) => {
  return (
    <>
      <div className={css.header}>
        <ul>
          <li className={css.textButtonWrapper}>
            <TextLinkElement displayedText="sneakers" path={"/"} size="large" />
          </li>
          <li className={css.textButtonWrapper}>
            <TextLinkElement displayedText="Men" path={"/men"} size="medium" />
          </li>
          <li className={css.textButtonWrapper}>
            <TextLinkElement
              displayedText="Women"
              path={"/women"}
              size="medium"
            />
          </li>
          <li className={css.textButtonWrapper}>
            <TextLinkElement
              displayedText="About"
              path={"/about"}
              size="medium"
            />
          </li>
          <li className={css.textButtonWrapper}>
            <TextLinkElement
              displayedText="Contact"
              path={"/contact"}
              size="medium"
            />
          </li>
        </ul>

        <div className={css.header__spacer}></div>
        <CartLinkElement />
        <div className={css.imageButtonWrapper}>
          <IconButton
            IconComponent={IconUserProfile}
            onClick={() => console.log("user profile")}
            buttonClass={["profileButton"]}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
