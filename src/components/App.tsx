import css from "./App.module.scss";
import AppContainer from "./AppContainer";
import {FC, StrictMode} from "react";
import {Provider} from "react-redux";
import {store} from "../redux/configureStore";

export const App: FC<{}> = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <div className={css.backgroundWrapper}>
          <AppContainer />
        </div>
      </Provider>
    </StrictMode>
  );
};
