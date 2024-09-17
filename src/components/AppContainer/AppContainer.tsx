import {FC, useEffect} from "react";
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
import {useSelector} from "react-redux";
import UserView from "../../views/UserView";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSpinUpNotify from "../../helper/useSpinUpNotify/useSpinUpNotify";
import {selectSpinupError} from "../../redux/slices/spinupErrorSlice";
import useCart from "../../hooks/useCart";
import {selectUsers} from "../../redux/selectors";

const AppContainer: FC = () => {
  const spinup = useSelector(selectSpinupError);
  const {error} = spinup;

  useSpinUpNotify(error);

  const {user, guestUser} = useSelector(selectUsers);

  const cart = useCart();
  const {getCart} = cart;

  useEffect(() => {
    const fetchData = () => {
      void getCart();
    };
    fetchData();
  }, [user?.user_id, guestUser?.user_id]);

  return (
    <BrowserRouter>
      <div className={css["global-app-container"]}>
        <ToastContainer
          position="bottom-left"
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
    </BrowserRouter>
  );
};

export default AppContainer;
