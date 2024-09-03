import {FC} from "react";
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

const UserView: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const {user, status, error} = auth;

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
      <div className={css["user-panel-body"]}>
        You had been successfully log out, please login to see details.
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
        />
        <UserDataBox
          IconComponent={IconPictureLandscape}
          title={"Your second name"}
          data={user?.second_name ? user.second_name : ""}
        />
        <UserDataBox
          IconComponent={IconShow}
          title={"Your email"}
          data={user?.email ? user.email : ""}
        />
        <UserDataBox
          IconComponent={IconUserProfile}
          title={"Your address"}
          data={user?.address ? user.address : ""}
        />
        <div className={css["logout-container"]}>
          <div className={css["logout-button-wrapper"]}>
            {
              <GeneralTextButton
                classProp={["logout-button"]}
                displayedText="Log out"
                onClick={handleLogout}
              />
            }
          </div>
        </div>
      </div>
    );
  };

  const pageContent = () => {
    if (auth.status === "loggedIn") return userLogIn();
    if (auth.status === "loggedOut") return userLoggedOut();
    else return userNotLogIn();
  };

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
