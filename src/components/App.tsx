import css from "./App.module.scss";
import AppContainer from "./AppContainer";
import {FC} from "react";

export const App: FC<{}> = () => {
  return (
    /*     <Routes> */
    <div className={css.backgroundWrapper}>
      <AppContainer />
    </div>
    /*     </Routes> */
  );
};
