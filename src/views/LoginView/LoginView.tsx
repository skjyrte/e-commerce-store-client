import {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import classNames from "classnames";
import css from "./LoginView.module.scss";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import validator from "validator";
import InputForm from "../../components/InputForm/InputForm";
import useLogin from "../../hooks/useLogin";

interface LoginFormData {
  email: string;
  password: string;
  name: string;
  address: string;
}

const LoginView: FC = () => {
  const {
    handleSubmit,
    register,
    formState: {errors, dirtyFields},
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {email: "", password: ""},
    shouldFocusError: false,
  });

  const login = useLogin();
  const {loginRequest, loginData, loading, error} = login;

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await loginRequest(data.email, data.password);
  };

  return (
    <div className={classNames(css["view-container"])}>
      <div className={classNames([css["form-container"]])}>
        {!loginData && (
          <div className={classNames(css["login-header"])}>
            Please fill in below to login
          </div>
        )}
        {error && (
          <div className={classNames(css["login-error-message"])}>
            {error.clientMessage}
          </div>
        )}

        {loginData && (
          <div className={classNames(css["login-success-message"])}>
            Successfully logged in as: {loginData.payload?.email}
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
            field={"email"}
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            currentValue={emailValue}
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
          <InputForm
            field={"password"}
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            currentValue={passwordValue}
            validateOptions={{
              required: "Password is required",
              minLength: {value: 1, message: "Password cannot be empty"},
            }}
          />
          <div className={css["submit-container"]}>
            <GeneralTextButton
              displayedText="Continue"
              classProp={["input-button"]}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
