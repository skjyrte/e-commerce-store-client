import {FC} from "react";
import css from "./UserModal.module.scss";
import classNames from "classnames";
import TextLinkElement from "../../LinkElements/TextLinkElement";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../redux/slices/authSlice";
import {AppDispatch} from "../../../redux/configureStore";
import {logout} from "../../../redux/slices/authSlice";
import GeneralTextButton from "../../buttons/GeneralTextButton";

interface Props {
  isHovered: boolean;
}

const CartModal: FC<Props> = ({isHovered}) => {
  const auth = useSelector(selectAuth);
  const {user, loaderState, loginState, validateUserTokenState} = auth;

  const dispatch = useDispatch<AppDispatch>();

  const userLoggedIn =
    (loginState === "success" || validateUserTokenState === "success") &&
    user?.guest === false;

  const handleLogout = () => {
    void dispatch(logout());
  };

  return (
    <div
      className={classNames(
        css["user-modal-container"],
        isHovered && css["modal-active"]
      )}
    >
      <div className={css["hide-border-element"]}></div>
      <div className={css["user-modal"]}>
        {userLoggedIn ? (
          <>
            <div className={css["user-account"]}>
              <TextLinkElement
                path={"/user"}
                displayedText="Your account"
                classProp={["user-modal-links"]}
              />
            </div>
            <div className={css["user-logout"]}>
              <GeneralTextButton
                classProp={["link-button"]}
                displayedText="Log out"
                onClick={handleLogout}
                isLoading={Boolean(loaderState)}
              />
            </div>
            <div className={css["user-not-valid"]}>
              <TextLinkElement
                path={"/register"}
                classProp={["user-modal-links"]}
                displayedText={"Register New User"}
              />
            </div>
          </>
        ) : (
          <>
            <div className={css["user-login"]}>
              <TextLinkElement
                path={"/login"}
                displayedText="Login"
                classProp={["user-modal-links"]}
              />
            </div>

            <div className={css["user-register"]}>
              <TextLinkElement
                path={"/register"}
                displayedText="Register"
                classProp={["user-modal-links"]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
