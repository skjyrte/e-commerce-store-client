import {useState} from "react";
import classNames from "classnames";
import css from "./InputForm.module.scss";
import {UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import IconButton from "../buttons/IconButton";
import IconShow from "../reactIcons/IconShow";

type FormObject = Record<string, string>;

interface Props {
  field: keyof FormObject;
  placeholder: string;
  type: "password" | "text";
  overrideType?: boolean;
  register: UseFormRegister<FormObject>;
  errors: FieldErrors<FormObject>;
  validateOptions: RegisterOptions<FormObject, keyof FormObject>;
  currentValue: string;
  disabled?: boolean;
}

const InputForm = ({
  field,
  placeholder,
  type,
  overrideType = false,
  register,
  errors,
  validateOptions,
  currentValue,
  disabled = false,
}: Props) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [overrided, setOverrided] = useState(false);

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
          type={overrided ? "text" : type}
          id={field}
          className={classNames(
            css["input-field"],
            errors[field] && css["input-error"]
          )}
          disabled={disabled}
        />
        <div className={css["component-footer-section"]}>
          <div className={css["error-message"]}>{errors[field]?.message}</div>
          <div
            className={classNames(
              [css["icon-button-wrapper"]],
              !overrideType && css["hide-button"]
            )}
          >
            <IconButton
              IconComponent={IconShow}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                setOverrided(!overrided);
              }}
              buttonClass={[
                "toggle-password-button",
                overrided ? "hidden-button" : "",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
