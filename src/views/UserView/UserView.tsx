import {FC, useEffect} from "react";
import css from "./UserView.module.scss";
import UserDataBox from "../../components/UserDataBox";
import IconCross from "../../components/inlineIcons/IconCross";
import IconPictureLandscape from "../../components/inlineIcons/IconPictureLandscape";
import IconShow from "../../components/inlineIcons/IconShow";
import IconUserProfile from "../../components/inlineIcons/IconUserProfile";
import {selectAuth} from "../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import {logout} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotReadyYet from "../../helper/NotReadyYet";

const UserView: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);

  const {user, loaderState, loginState, logoutState, validateUserTokenState} =
    auth;

  const userLoggedIn =
    (loginState === "success" || validateUserTokenState === "success") &&
    user?.guest === false;

  const navigate = useNavigate();

  const handleLogout = () => {
    void dispatch(logout());
  };

  const userNotLogIn = () => {
    return (
      <div className={css["user-panel-body"]}>Please login to see details.</div>
    );
  };

  const userLoggedOut = () => {
    return (
      <div className={css["logout-container"]}>
        <div className={css["logout-body"]}>
          You had been successfully log out, please login to see details.
        </div>
      </div>
    );
  };

  const errorPresent = () => {
    return (
      <div className={css["logout-container"]}>
        We have an error, please try again later.
      </div>
    );
  };

  const userLogIn = () => {
    return (
      <div className={css["user-panel-body"]}>
        <UserDataBox
          IconComponent={IconCross}
          title={"Your first name"}
          data={user?.first_name ? user.first_name : ""}
          onClick={NotReadyYet}
        />
        <UserDataBox
          IconComponent={IconPictureLandscape}
          title={"Your second name"}
          data={user?.second_name ? user.second_name : ""}
          onClick={NotReadyYet}
        />
        <UserDataBox
          IconComponent={IconShow}
          title={"Your email"}
          data={user?.email ? user.email : ""}
          onClick={NotReadyYet}
        />
        <UserDataBox
          IconComponent={IconUserProfile}
          title={"Your address"}
          data={user?.address ? user.address : ""}
          onClick={NotReadyYet}
        />
        <div className={css["logout-container"]}>
          <div className={css["logout-button-wrapper"]}>
            {
              <GeneralTextButton
                classProp={["logout-button"]}
                displayedText="Log out"
                onClick={handleLogout}
                isLoading={Boolean(loaderState)}
              />
            }
          </div>
        </div>
      </div>
    );
  };

  const pageContent = () => {
    if (userLoggedIn) {
      return userLogIn();
    } else if (logoutState === "success") {
      return userLoggedOut();
    } else return userNotLogIn();
  };

  useEffect(() => {
    if (logoutState === "success") {
      toast.success("Log out successful!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [auth.loginState]);

  return (
    <div className={css["user-view-container"]}>
      <div className={css["user-panel"]}>
        <div className={css["user-panel-header"]}>Your Account</div>
        {pageContent()}
      </div>
    </div>
  );
};

export default UserView;
