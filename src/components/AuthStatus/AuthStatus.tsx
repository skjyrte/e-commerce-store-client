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
import {selectUsers} from "../../redux/selectors";

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

  const users = useSelector(selectUsers);

  const userLoggedIn =
    (loginState === "success" || validateUserTokenState === "success") &&
    user?.guest === false;

  useEffect(() => {
    const fetchAuthStatus = async () => {
      //NOTE - validate user token here
      if (
        validateUserTokenState !== "success" &&
        !users.user?.user_id &&
        !loaderState
      ) {
        try {
          await dispatch(validateUserToken()).unwrap();
          console.log("User token auth success");
        } catch (err) {
          console.error("User token auth failed");
        }
      }
      //NOTE - validate guest user token here
      if (
        validateGuestTokenState !== "success" &&
        !users.guestUser?.user_id &&
        !loaderState
      ) {
        try {
          await dispatch(validateGuestToken()).unwrap();
          console.log("Guest user token auth success");
        } catch (err) {
          console.error("Guest user token auth failed");
        }
      }
    };
    void fetchAuthStatus();
  }, [users.guestUser?.user_id, users.user?.user_id]);

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
