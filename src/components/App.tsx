import css from "./App.module.scss";
import AppContainer from "./AppContainer";
import {FC, StrictMode} from "react";

export const App: FC<{}> = () => {
  return (
    <StrictMode>
      <div className={css.backgroundWrapper}>
        <AppContainer />
      </div>
    </StrictMode>
  );
};
