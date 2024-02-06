import {FC, createContext, useState} from "react";
import css from "./AppContainer.module.scss";
import Header from "../Header";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";

import image1 from "../../images/product/image-product-1.jpg";
import image2 from "../../images/product/image-product-2.jpg";
import image3 from "../../images/product/image-product-3.jpg";
import image4 from "../../images/product/image-product-4.jpg";
import image5 from "../../images/product/image-product-1.jpg";
import image6 from "../../images/product/image-product-2.jpg";
import image7 from "../../images/product/image-product-3.jpg";
import image8 from "../../images/product/image-product-4.jpg";
import image9 from "../../images/product/image-product-1.jpg";
import image10 from "../../images/product/image-product-2.jpg";
import image11 from "../../images/product/image-product-3.jpg";
import image12 from "../../images/product/image-product-4.jpg";
import ProductView from "../../views/ProductView";
import CategoryView from "../../views/CategoryView";
import {emptyProduct} from "../../components/Constants/data";

const imagesList = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];

export const ApiResponseContext = createContext<
  (React.Dispatch<React.SetStateAction<ResponseObject>> | ResponseObject)[]
>([]);

const AppContainer: FC = ({}) => {
  const [context, setContext] = useState(emptyProduct);
  return (
    <ApiResponseContext.Provider value={[context, setContext]}>
      <HashRouter>
        <div className={css.appContainer}>
          <Header />
          <Routes>
            <Route path="/" element={<div>home</div>} />
            <Route path="/men" element={<CategoryView />} />
            <Route
              path="/men/:productId"
              element={<ProductView imagesList={imagesList} />}
            />
            <Route path="/women" element={<CategoryView />} />
            <Route path="/about" element={<div>about</div>} />
            <Route path="/contact" element={<div>contact</div>} />
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </div>
      </HashRouter>
    </ApiResponseContext.Provider>
  );
};
export default AppContainer;
