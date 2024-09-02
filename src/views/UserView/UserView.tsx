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

const UserView: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const {user, status, error} = auth;

  const userNotLogIn = () => {
    return (
      <div className={css["user-panel-body"]}>Please login to see details</div>
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
              />
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={css["user-view-container"]}>
      <div className={css["user-panel"]}>
        <div className={css["user-panel-header"]}>Your Account</div>
        {auth.status === "success" ? userLogIn() : userNotLogIn()}
      </div>
    </div>
  );
};

export default UserView;
