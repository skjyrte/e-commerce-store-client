import {FC, useState} from "react";
import css from "./SizeDropdown.module.scss";
import classNames from "classnames";
import SizeTextfield from "./SizeTextfield";

interface Props {
  onSelectSize: (selectedSize: string) => void;
  stockArray: StockResponse[];
  selectedSize: null | string;
}

const SizeDropdown: FC<Props> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const {onSelectSize, stockArray, selectedSize} = props;

  const selectedSizeObject = stockArray.find(
    (stockObject) => stockObject.size === selectedSize
  );

  const sizesList = stockArray.map((sizeField) => {
    return (
      <li className={classNames(css["li-wrapper"])}>
        <input
          className={css["input-element"]}
          type="radio"
          id={sizeField.size}
          name={"selected-size"}
          checked={selectedSize === sizeField.size}
          onChange={() => {
            onSelectSize(sizeField.size);
            setIsActive(!isActive);
          }}
        />
        <label
          onClick={() => {
            onSelectSize(sizeField.size);
            setIsActive(!isActive);
          }}
          htmlFor={sizeField.size}
          className={classNames(css["ul-label"])}
        >
          <div className={classNames(css["ul-content"])}>
            <SizeTextfield sizeField={sizeField} />
          </div>
        </label>
      </li>
    );
  });

  const renderDropdown = () => {
    return (
      <div
        className={classNames(
          css["dropdown-wrapper"],
          isActive ? "" : css["hide-dropdown"]
        )}
      >
        <div className={css["hide-border-element"]}></div>
        <div className={classNames(css["dropdown-list-box"])}>
          <ul className={classNames(css["sizes-ul"])}>{sizesList}</ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={classNames(css["main-component-box"])}>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={classNames(css["dropdown-main-button"])}
        >
          {selectedSizeObject ? (
            <p className={classNames([css["button-size-text"]])}>
              <SizeTextfield sizeField={selectedSizeObject} />
            </p>
          ) : (
            <p className={classNames([css["button-placeholder-text"]])}>
              Choose size
            </p>
          )}
        </button>
        {renderDropdown()}
      </div>
    </>
  );
};

export default SizeDropdown;
