import {useDispatch, useSelector} from "react-redux";
import {login, selectAuth} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/configureStore";

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const {user, status, error} = auth;

  const loginRequest = async (email: string, password: string) => {
    if (status === "loading") {
      return;
    }
    await dispatch(login({email, password}));
  };

  return {
    loginRequest,
    user,
    status,
    error,
  };
};

export default useLogin;
