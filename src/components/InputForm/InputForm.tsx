import {FC, useState} from "react";
import classNames from "classnames";
import css from "./InputForm.module.scss";
import {UseFormRegister, FieldErrors, Path} from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  field: Path<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  dirtyFields: Partial<Record<Path<FormData>, boolean>>;
  validateOptions: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    validate?: Record<string, (value: string) => boolean | string>;
  };
}

const InputForm: FC<Props> = ({
  field,
  register,
  errors,
  dirtyFields,
  validateOptions,
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className={classNames(css["form-container"])}>
      <div className={css["form-field-contents"]}>
        <label
          htmlFor={field}
          className={classNames(
            css["input-label"],
            errors[field] && css["input-error"],
            (inputFocus || dirtyFields[field]) && css["input-top-label"]
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
        />

        <div className={css["error-message"]}>{errors[field]?.message}</div>
      </div>
    </div>
  );
};

export default InputForm;
