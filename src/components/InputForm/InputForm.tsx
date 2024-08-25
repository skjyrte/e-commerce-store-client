import {useState} from "react";
import classNames from "classnames";
import css from "./InputForm.module.scss";
import {UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";

type FormObject = Record<string, string>;

interface Props {
  field: keyof FormObject;
  register: UseFormRegister<FormObject>;
  errors: FieldErrors<FormObject>;
  validateOptions: RegisterOptions<FormObject, keyof FormObject>;
  currentValue: string;
  disabled?: boolean; // Add disabled prop here
}

const InputForm = ({
  field,
  register,
  errors,
  validateOptions,
  currentValue,
  disabled = false, // Default value set to false
}: Props) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className={classNames(css["form-container"])}>
      <div className={css["form-field-contents"]}>
        <label
          htmlFor={field}
          className={classNames(
            css["input-label"],
            errors[field] && css["input-error"],
            (inputFocus || currentValue) && css["input-top-label"]
          )}
        >
          {field}
        </label>
        <input
          {...register(field, validateOptions)}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          type={field === "password" ? "password" : "text"}
          id={field}
          className={classNames(
            css["input-field"],
            errors[field] && css["input-error"]
          )}
          disabled={disabled} // Add disabled prop here
        />
        <div className={css["error-message"]}>{errors[field]?.message}</div>
      </div>
    </div>
  );
};

export default InputForm;
