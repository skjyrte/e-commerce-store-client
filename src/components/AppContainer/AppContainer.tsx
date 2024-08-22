import {FC} from "react";
import css from "./AppContainer.module.scss";
import MainHeader from "../MainHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductView from "../../views/ProductView";
import CategoryView from "../../views/CategoryView";
import InvalidPageView from "../../views/InvalidPageView";
import CartView from "../../views/CartView";
import HomeView from "../../views/HomeView";
import LoginView from "../../views/LoginView";

const AppContainer: FC = () => {
  return (
    <BrowserRouter>
      <div className={css["app-container"]}>
        <MainHeader />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/home" element={<CategoryView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/:gender" element={<CategoryView />} />
          <Route path="/:gender/:category" element={<CategoryView />} />
          <Route path="/*" element={<InvalidPageView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default AppContainer;
