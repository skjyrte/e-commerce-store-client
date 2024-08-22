import {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import classNames from "classnames";
import css from "./LoginView.module.scss";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import validator from "validator";
import InputForm from "../../components/InputForm/InputForm";

interface FormData {
  email: string;
  password: string;
}

const LoginView: FC = () => {
  const {
    handleSubmit,
    register,
    formState: {errors, dirtyFields},
  } = useForm<FormData>({
    defaultValues: {email: ""},
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className={classNames(css["view-container"])}>
      <div className={classNames([css["form-container"]])}>
        <div className={classNames(css["login-header"])}>
          Please fill in your email and password to login
        </div>
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
