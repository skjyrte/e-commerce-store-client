import {useEffect, FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectAuth} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/configureStore";
import css from "./AuthStatus.module.scss";
import IconUserProfile from "../inlineIcons/IconUserProfile";
import {BarLoader} from "react-spinners";
import {
  validateUserToken,
  validateGuestToken,
} from "../../redux/slices/authSlice";

const AuthStatus: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const {
    user,
    loaderState,
    loginState,
    validateGuestTokenState,
    validateUserTokenState,
  } = auth;

  const userLoggedIn =
    (loginState === "success" || validateUserTokenState === "success") &&
    user?.guest === false;

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (
        loginState !== "success" &&
        validateUserTokenState !== "success" &&
        !loaderState
      ) {
        try {
          await dispatch(validateUserToken()).unwrap();
        } catch (err) {
          try {
            await dispatch(validateGuestToken()).unwrap();
          } catch (err) {
            return;
          }
        }
      }
    };
    void fetchAuthStatus();
  }, [loginState]);

  const displayText = () => {
    if (loaderState) {
      return (
        <div className={css["loader-wrapper"]}>
          <BarLoader />
        </div>
      );
    }

    if (userLoggedIn) {
      return (
        <div className={css["welcome-message"]}>
          Hello, <span className={css["user-name"]}>{user.first_name}!</span>
        </div>
      );
    } else {
      return <div>Hi, try logging in here!</div>;
    }
  };

  return (
    <div className={css["login-container"]}>
      <div className={css["user-avatar-warpper"]}>
        <IconUserProfile />
      </div>
      {displayText()}
    </div>
  );
};

export default AuthStatus;
