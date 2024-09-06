import {useEffect, FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/configureStore";
import {checkAuthStatus} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/configureStore";
import css from "./AuthStatus.module.scss";
import IconUserProfile from "../inlineIcons/IconUserProfile";
import {BarLoader} from "react-spinners";

const AuthStatus: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user, status} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (status === "verifyToken") {
        try {
          await dispatch(checkAuthStatus()).unwrap();
        } catch (err) {
          console.warn("Failed to log with token: ", err);
        }
      }
    };
    void fetchAuthStatus();
  }, [status]);

  const displayText = () => {
    if (status === "loading") {
      return (
        <div className={css["loader-wrapper"]}>
          <BarLoader />
        </div>
      );
    }

    if (status === "loggedIn" && user) {
      return (
        <div className={css["welcome-message"]}>
          Hello, <span className={css["user-name"]}>{user.first_name}!</span>
        </div>
      );
    }

    if (status === "failed" || status === "loggedOut" || !user) {
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
