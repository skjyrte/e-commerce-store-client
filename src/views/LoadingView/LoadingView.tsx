import {FC, useEffect, useState} from "react";
import css from "./LoadingView.module.scss";
import {PuffLoader} from "react-spinners";

const InvalidPageView: FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={css.contentWrapper}>
      <div className={css.header}>Loading, please wait</div>
      <div className={css["loader-container"]}>
        <PuffLoader />
      </div>
      <div
        className={`${css["description-container"]} ${isActive ? css.active : ""}`}
      >
        API is being hosted on a free instance of render.com. Because of that,
        the server spins down after inactivity and needs around 60 seconds to
        spin up again.
      </div>
    </div>
  );
};

export default InvalidPageView;
