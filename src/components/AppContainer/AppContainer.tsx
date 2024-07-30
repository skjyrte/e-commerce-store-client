import {FC} from "react";
import css from "./AppContainer.module.scss";
import Header from "../Header";
import {HashRouter, Route, Routes} from "react-router-dom";

import ProductView from "../../views/ProductView";
import CategoryView from "../../views/CategoryView";
import InvalidPageView from "../../views/InvalidPageView";
import CartView from "../../views/CartView";

const AppContainer: FC = () => {
  return (
    <HashRouter>
      <div className={css.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/home" element={<div>home</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/:gender" element={<CategoryView />} />
          <Route path="/:gender/:id" element={<ProductView />} />
          <Route path="/*" element={<InvalidPageView />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
export default AppContainer;
