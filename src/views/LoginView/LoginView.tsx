import {FC, useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import classNames from "classnames";
import css from "./LoginView.module.scss";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import validator from "validator";
import InputForm from "../../components/InputForm/InputForm";
import useLogin from "../../hooks/useLogin";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ControlledInputForm from "../../components/ControlledInputForm";

type LoginFormData = Record<string, string>;

const LoginView: FC = () => {
  const {
    handleSubmit,
    register,
    formState: {errors},
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {email: "", password: ""},
    shouldFocusError: false,
  });
  const {loginRequest, user, loginState, clearStateRequest, loaderState} =
    useLogin();
  const navigate = useNavigate();
  const [overrided, setOverrided] = useState(false);

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await loginRequest(data.email, data.password);
  };

  const onClickOverride = () => {
    setOverrided(!overrided);
  };

  useEffect(() => {
    if (loginState === "error") clearStateRequest();
  }, []);

  useEffect(() => {
    if (loginState === "success") {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [loginState]);

  return (
    <div className={classNames(css["view-container"])}>
      <div className={classNames([css["form-container"]])}>
        {!user && loginState !== "success" && (
          <div className={classNames(css["login-header"])}>
            Please fill in below to login
          </div>
        )}
        {loginState === "error" && (
          <div className={classNames(css["login-error-message"])}>
            We have an error, please try again later.
          </div>
        )}
        {user && loginState !== "error" && (
          <div className={classNames(css["login-success-message"])}>
            Successfully logged in as: {user.email}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}
          method="post"
          className={css["email-entry-form"]}
        >
          <InputForm
            field="email"
            placeholder="email"
            register={register}
            errors={errors}
            currentValue={emailValue}
            disabled={Boolean(loaderState)}
            validateOptions={{
              required: "Email is required",
              maxLength: {
                value: 320,
                message: "Email cannot exceed 320 characters",
              },
              validate: {
                validator: (v) =>
                  validator.isEmail(v) || "Invalid email format",
              },
            }}
          />
          <ControlledInputForm
            field="password"
            placeholder="password"
            register={register}
            type={"password"}
            errors={errors}
            currentValue={passwordValue}
            disabled={Boolean(loaderState)}
            validateOptions={{
              required: "Password is required",
              minLength: {value: 1, message: "Password cannot be empty"},
            }}
            overrided={overrided}
            onClickOverride={onClickOverride}
          />
          <div className={css["submit-container"]}>
            <GeneralTextButton
              displayedText="Continue"
              classProp={["input-button"]}
              isLoading={Boolean(loaderState)}
              onClick={() => {
                return;
              }}
            />
          </div>
        </form>
        <div className={css["register-redirection-container"]}>
          Don't have an account? You can register{" "}
          <Link className={css["register-link"]} to="/register">
            {" "}
            here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
