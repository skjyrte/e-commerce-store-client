import {FC, useEffect, useState} from "react";
import css from "./LoadingView.module.scss";
import {PuffLoader} from "react-spinners";
import classNames from "classnames";

interface Props {
  hasError: boolean;
}

const InvalidPageView: FC<Props> = ({hasError}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const headerText = hasError ? "We have an error :(" : "Loading, please wait";
  const paraText = hasError
    ? "Please reload the page or try again later"
    : "API spins down after period of inactivity and needs around 60 seconds to spin up again.";

  return (
    <div className={css["view-container"]}>
      <div
        className={classNames(css.header, isVisible && css["element-visible"])}
      >
        {headerText}
      </div>
      <div
        className={classNames(
          css["loader-container"],
          isVisible && css["element-visible"]
        )}
      >
        {hasError ? <></> : <PuffLoader />}
      </div>
      <div
        className={classNames(
          css["description-container"],
          isVisible && css["element-visible"]
        )}
      >
        {paraText}
      </div>
    </div>
  );
};

export default InvalidPageView;
