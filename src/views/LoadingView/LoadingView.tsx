import {FC, useEffect, useState} from "react";
import css from "./LoadingView.module.scss";
import {PuffLoader} from "react-spinners";
import classNames from "classnames";

const InvalidPageView: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={css["view-container"]}>
      <div
        className={classNames(css.header, isVisible && css["element-visible"])}
      >
        Loading, please wait
      </div>
      <div
        className={classNames(
          css["loader-container"],
          isVisible && css["element-visible"]
        )}
      >
        <PuffLoader />
      </div>
      <div
        className={classNames(
          css["description-container"],
          isVisible && css["element-visible"]
        )}
      >
        API spins down after period of inactivity and needs around 60 seconds to
        spin up again.
      </div>
    </div>
  );
};

export default InvalidPageView;
