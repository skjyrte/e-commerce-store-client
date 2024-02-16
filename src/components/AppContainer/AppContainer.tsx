import {FC, createContext, useState} from "react";
import css from "./AppContainer.module.scss";
import Header from "../Header";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";

import ProductView from "../../views/ProductView";
import CategoryView from "../../views/CategoryView";
import InvalidPageView from "../../views/InvalidPageView";

export const ApiResponseContext = createContext<
  (React.Dispatch<React.SetStateAction<ResponseObject>> | ResponseObject)[]
>([]);

const AppContainer: FC = ({}) => {
  return (
    <HashRouter>
      <div className={css.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/home" element={<div>home</div>} />
          <Route path="/men" element={<CategoryView />} />
          <Route path="/men/:productId" element={<ProductView />} />
          <Route path="/women" element={<CategoryView />} />
          <Route path="/women/:productId" element={<ProductView />} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/*" element={<InvalidPageView />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
export default AppContainer;
