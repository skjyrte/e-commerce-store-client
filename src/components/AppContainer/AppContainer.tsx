import {FC} from "react";
import css from "./AppContainer.module.scss";
import Header from "../Header";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

const AppContainer: FC = ({}) => {
  return (
    <Router>
      <div className={css.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/men" element={<div>men</div>} />
          <Route path="/women" element={<div>women</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
        </Routes>
      </div>
    </Router>
  );
};
export default AppContainer;
