import {FC} from "react";
import css from "./Header.module.scss";
import TextLinkElement from "../LinkElements/TextLinkElement";
import IconButton from "../Buttons/IconButton";
import CartButton from "../Buttons/CartButton";
import IconUserProfile from "../Icons/IconUserProfile";

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
        <CartButton />
        {/*         <div
          className={classNames(
            css.cartButtonWrapper,
            cartModalVisible === true ? css.cartOpened : ""
          )}
        >
          <IconButton
            IconComponent={IconCart}
            onClick={onCartClick}
            buttonClass={["cartButton"]}
          />
          {cartModalVisible === true ? <CartModal /> : <></>}
        </div> */}
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
