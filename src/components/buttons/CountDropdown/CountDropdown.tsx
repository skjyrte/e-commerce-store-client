import {FC} from "react";
import css from "./CountDropdown.module.scss";
import classNames from "classnames";
import SizeTextfield from "./SizeTextfield";
import {BeatLoader} from "react-spinners";

interface Props {
  onSelectQuantity: (quantity: number) => void;
  selectedQuantity: null | number;
  maxOrder: number;
  dropdownId: string;
  activeDropdown: string | null;
  onClickDropdown: (id: string | null) => void;
  isLoading: boolean;
}

const CountDropdown: FC<Props> = (props) => {
  const {
    onSelectQuantity,
    maxOrder,
    selectedQuantity,
    activeDropdown,
    onClickDropdown,
    dropdownId,
    isLoading,
  } = props;

  const itemQuantityArray = new Array(maxOrder)
    .fill(0)
    .map((count, index) => index + 1);

  const sizesList = itemQuantityArray.map((quantity, index) => {
    return (
      <li
        key={`item-quantity-list-element-${index.toString()}`}
        className={classNames(css["li-wrapper"])}
      >
        <input
          className={css["input-element"]}
          type="radio"
          id={quantity.toString()}
          name={"selected-size"}
          checked={selectedQuantity === quantity}
          onChange={() => {
            onSelectQuantity(quantity);
            onClickDropdown(null);
          }}
        />
        <label
          onClick={() => {
            onSelectQuantity(quantity);
            onClickDropdown(activeDropdown === dropdownId ? null : dropdownId);
          }}
          htmlFor={quantity.toString()}
          className={classNames(css["ul-label"])}
        >
          <div className={classNames(css["ul-content"])}>
            <SizeTextfield quantity={quantity} />
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
          activeDropdown === dropdownId ? "" : css["hide-dropdown"]
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
    <div
      className={classNames(
        css["main-component-box"],
        activeDropdown === dropdownId ? css["dropdown-being-visible"] : ""
      )}
    >
      <button
        onClick={() => {
          onClickDropdown(activeDropdown === dropdownId ? null : dropdownId);
        }}
        className={classNames(css["dropdown-main-button"])}
      >
        {selectedQuantity ? (
          <p className={classNames([css["button-size-text"]])}>
            {isLoading ? (
              <BeatLoader size={10} />
            ) : (
              <SizeTextfield quantity={selectedQuantity} />
            )}
          </p>
        ) : (
          <p className={classNames([css["button-placeholder-text"]])}>
            Choose quantity
          </p>
        )}
      </button>
      {renderDropdown()}
    </div>
  );
};

export default CountDropdown;
