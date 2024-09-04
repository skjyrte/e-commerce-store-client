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
import MiniHeader from "../MiniHeader";
import {store} from "../../redux/configureStore";
import {Provider} from "react-redux";
import UserView from "../../views/UserView";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinUpNotify from "../../helper/SpinUpNotify";

const AppContainer: FC = () => {
  process.env.SPINUP_NOTIFY ? SpinUpNotify() : null;

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={css["app-container"]}>
          <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            autoClose={2000}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

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
                    <MiniHeader />
                    <LoginView />
                  </PageTransition>
                }
              />
              <Route
                path="/user"
                element={
                  <PageTransition duration={1.5}>
                    <MiniHeader />
                    <UserView />
                  </PageTransition>
                }
              />
              <Route
                path="/register"
                element={
                  <PageTransition>
                    <MiniHeader />
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
      </Provider>
    </BrowserRouter>
  );
};

export default AppContainer;
