import {useDispatch, useSelector} from "react-redux";
import {login, selectAuth} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/configureStore";
import {clearState} from "../../redux/slices/authSlice";

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const {user, loaderState, loginState} = auth;

  console.log({loaderState});

  const loginRequest = async (email: string, password: string) => {
    if (loaderState) {
      return;
    }
    await dispatch(login({email, password}));
  };

  const clearStateRequest = () => {
    dispatch(clearState("loginState"));
  };

  return {
    loginRequest,
    user,
    loginState,
    clearStateRequest,
    loaderState,
  };
};

export default useLogin;
