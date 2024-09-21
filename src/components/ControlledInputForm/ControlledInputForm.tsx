import {useState} from "react";
import classNames from "classnames";
import css from "./ControlledInputForm.module.scss";
import {UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import IconButton from "../buttons/IconButton";
import IconVisible from "../reactIcons/IconVisible";
import IconNotVisible from "../reactIcons/IconNotVisible";

type FormObject = Record<string, string>;

interface Props {
  field: keyof FormObject;
  placeholder: string;
  type: "password" | "text";
  register: UseFormRegister<FormObject>;
  errors: FieldErrors<FormObject>;
  validateOptions: RegisterOptions<FormObject, keyof FormObject>;
  currentValue: string;
  overrided: boolean;
  onClickOverride: () => void;
  disabled?: boolean;
}

const ControlledInputForm = ({
  field,
  placeholder,
  type,
  register,
  errors,
  validateOptions,
  currentValue,
  overrided,
  onClickOverride,
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
          <div className={classNames([css["icon-button-wrapper"]])}>
            <IconButton
              IconComponent={overrided ? IconNotVisible : IconVisible}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                onClickOverride();
              }}
              buttonClass={["toggle-password-button"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlledInputForm;
