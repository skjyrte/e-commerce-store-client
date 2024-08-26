import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import MainHeader from "../MainHeader";
import ProductView from "../../views/ProductView";
import CategoryView from "../../views/CategoryView";
import InvalidPageView from "../../views/InvalidPageView";
import CartView from "../../views/CartView";
import HomeView from "../../views/HomeView";
import LoginView from "../../views/LoginView";
import RegisterView from "../../views/RegisterView";
import PageTransition from "../PageTransition";
import css from "./AppContainer.module.scss";

const AppContainer: FC = () => {
  return (
    <BrowserRouter>
      <div className={css["app-container"]}>
        <MainHeader />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomeView />
                </PageTransition>
              }
            />
            <Route
              path="/home"
              element={
                <PageTransition>
                  <CategoryView />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <CartView />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginView />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <RegisterView />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductView />
                </PageTransition>
              }
            />
            <Route
              path="/:gender"
              element={
                <PageTransition>
                  <CategoryView />
                </PageTransition>
              }
            />
            <Route
              path="/:gender/:category"
              element={
                <PageTransition>
                  <CategoryView />
                </PageTransition>
              }
            />
            <Route
              path="/*"
              element={
                <PageTransition>
                  <InvalidPageView />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default AppContainer;
