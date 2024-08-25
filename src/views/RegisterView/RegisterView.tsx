import {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import classNames from "classnames";
import css from "./RegisterView.module.scss";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import validator from "validator";
import InputForm from "../../components/InputForm/InputForm";
import useRegisterUser from "../../hooks/useRegisterUser";

type RegisterFormData = Record<string, string>;

const RegisterView: FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: {errors},
  } = useForm<RegisterFormData>({
    defaultValues: {email: ""},
    shouldFocusError: false,
  });

  const registerUserInstance = useRegisterUser();

  const {registerUser, registerUserData, loading, error} = registerUserInstance;

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const addressValue = watch("address");
  const nameValue = watch("name");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const formData = {
      email: data.email,
      password: data.password,
      name: data.name,
      address: data.address,
    };
    await registerUser({...formData});
  };

  return (
    <div className={classNames(css["view-container"])}>
      <div className={classNames([css["form-container"]])}>
        <div className={classNames(css["register-header"])}>
          Please fill in your data to register
        </div>
        {error && (
          <div className={classNames(css["register-error-message"])}>
            {error.clientMessage}
          </div>
        )}
        {registerUserData && (
          <div className={classNames(css["register-success-message"])}>
            Successfully logged in as: {registerUserData.payload?.email}
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
            currentValue={emailValue}
            disabled={loading}
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
            currentValue={passwordValue}
            disabled={loading}
            validateOptions={{
              required: "Password is required",
              minLength: {value: 1, message: "Password cannot be empty"},
            }}
          />
          <InputForm
            field={"name"}
            register={register}
            errors={errors}
            currentValue={nameValue}
            disabled={loading}
            validateOptions={{
              required: "Name is required",
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters",
              },
            }}
          />
          <InputForm
            field={"address"}
            register={register}
            errors={errors}
            currentValue={addressValue}
            disabled={loading}
            validateOptions={{
              required: "Address is required",
              maxLength: {
                value: 100,
                message: "Address cannot exceed 100 characters",
              },
            }}
          />
          <div className={css["submit-container"]}>
            <GeneralTextButton
              displayedText="Continue"
              classProp={["input-button"]}
              isLoading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
