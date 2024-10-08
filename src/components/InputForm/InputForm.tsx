import {useState} from "react";
import classNames from "classnames";
import css from "./InputForm.module.scss";
import {UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";

type FormObject = Record<string, string>;

interface Props {
  field: keyof FormObject;
  placeholder: string;
  register: UseFormRegister<FormObject>;
  errors: FieldErrors<FormObject>;
  validateOptions: RegisterOptions<FormObject, keyof FormObject>;
  currentValue: string;
  disabled?: boolean;
}

const InputForm = ({
  field,
  placeholder,
  register,
  errors,
  validateOptions,
  currentValue,
  disabled = false,
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
          {placeholder}
        </label>
        <input
          {...register(field, validateOptions)}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          type={"text"}
          id={field}
          className={classNames(
            css["input-field"],
            errors[field] && css["input-error"]
          )}
          disabled={disabled}
        />
        <div className={css["component-footer-section"]}>
          <div className={css["error-message"]}>{errors[field]?.message}</div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
