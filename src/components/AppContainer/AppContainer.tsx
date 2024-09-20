import {FC, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
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
import UserView from "../../views/UserView";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSpinUpNotify from "../../helper/useSpinUpNotify/useSpinUpNotify";
import {selectSpinupError} from "../../redux/slices/spinupErrorSlice";
import LoadingView from "../../views/LoadingView";
import {
  preflightConnection,
  selectApiConnection,
} from "../../redux/slices/apiConnectionSlice";
import {AppDispatch} from "../../redux/configureStore";

const AppContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {loaderState} = useSelector(selectApiConnection);

  const spinup = useSelector(selectSpinupError);
  const {error} = spinup;
  useSpinUpNotify(error);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await dispatch(preflightConnection()).unwrap();
      } catch (error) {
        console.error;
      }
    };

    if (loaderState !== "success") {
      void checkApiConnection();
    }
  }, []);

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
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path={loaderState !== "success" ? "/*" : undefined}
              element={
                <PageTransition duration={1}>
                  <LoadingView />
                </PageTransition>
              }
            />
            <Route
              path={loaderState === "success" ? "/" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <HomeView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/home" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <CategoryView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/cart" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <CartView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/login" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <MiniHeader />
                    <LoginView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/user" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition duration={1.5}>
                    <MiniHeader />
                    <UserView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/register" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <MiniHeader />
                    <RegisterView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/product/:id" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <ProductView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/:gender" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <CategoryView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={
                loaderState === "success" ? "/:gender/:category" : undefined
              }
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <CategoryView />
                  </PageTransition>
                </>
              }
            />
            <Route
              path={loaderState === "success" ? "/*" : undefined}
              element={
                <>
                  <MainHeader />
                  <PageTransition>
                    <InvalidPageView />
                  </PageTransition>
                </>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default AppContainer;
