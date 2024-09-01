import {useEffect, FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/configureStore";
import {checkAuthStatus} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/configureStore";
import css from "./AuthStatus.module.scss";

const AuthStatus: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user, status} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (status === "idle") {
        try {
          await dispatch(checkAuthStatus()).unwrap();
        } catch (error) {
          console.error("Failed to check auth status:", error);
        }
      }
    };
    void fetchAuthStatus();
  }, [dispatch, status]);

  const displayText = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "failed") {
      return <p>Hi, try logging in!</p>;
    }

    return (
      <p>
        Hello, <span className={css["user-name"]}>{user?.first_name}!</span>
      </p>
    );
  };

  return <div className={css["login-container"]}>{displayText()}</div>;
};

export default AuthStatus;
