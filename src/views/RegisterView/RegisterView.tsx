import {FC, useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import classNames from "classnames";
import css from "./RegisterView.module.scss";
import GeneralTextButton from "../../components/buttons/GeneralTextButton";
import validator from "validator";
import InputForm from "../../components/InputForm/InputForm";
import useRegisterUser from "../../hooks/useRegisterUser";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RegisterFormData = Record<string, string>;

const RegisterView: FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: {errors},
  } = useForm<RegisterFormData>({
    shouldFocusError: false,
  });

  const registerUserInstance = useRegisterUser();

  const {registerUser, registerUserData, loading, error} = registerUserInstance;

  const emailValue = watch("email");
  const setPasswordValue = watch("setPassword");
  const passwordValue = watch("password");
  const addressValue = watch("address");
  const firstNameValue = watch("firstName");
  const secondNameValue = watch("secondName");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const formData = {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      second_name: data.secondName,
      address: data.address,
    };
    await registerUser({...formData});
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (registerUserData) {
      toast.success("User registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [registerUserData]);

  return (
    <div className={classNames(css["view-container"])}>
      <div className={classNames([css["form-container"]])}>
        <div className={classNames(css["register-header"])}>
          Please fill in your data to register
        </div>
        {error && (
          <div className={classNames(css["register-error-message"])}>
            {error}
          </div>
        )}
        {registerUserData && (
          <div className={classNames(css["register-success-message"])}>
            <div className={css["register-redirection-container"]}>
              Register complete! You can login
              <Link className={css["register-link"]} to="/login">
                here
              </Link>
            </div>
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
            placeholder={"Email"}
            type={"text"}
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
            placeholder={"Password"}
            type={"password"}
            overrideType={true}
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
            field={"setPassword"}
            placeholder={"Confirm Password"}
            type={"password"}
            overrideType={true}
            register={register}
            errors={errors}
            currentValue={setPasswordValue}
            disabled={loading}
            validateOptions={{
              required: "Password is required",
              minLength: {value: 1, message: "Password cannot be empty"},
              validate: {
                validator: (v) =>
                  v === passwordValue || "Passwords do not match",
              },
            }}
          />
          <InputForm
            field={"firstName"}
            placeholder={"First Name"}
            type={"text"}
            register={register}
            errors={errors}
            currentValue={firstNameValue}
            disabled={loading}
            validateOptions={{
              required: "First name is required",
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters",
              },
            }}
          />
          <InputForm
            field={"secondName"}
            placeholder={"Second Name"}
            type={"text"}
            register={register}
            errors={errors}
            currentValue={secondNameValue}
            disabled={loading}
            validateOptions={{
              required: "Second name is required",
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters",
              },
            }}
          />
          <InputForm
            field={"address"}
            placeholder={"Address"}
            type={"text"}
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
