import {FC} from "react";
import css from "./AppContainer.module.scss";
import Header from "../Header";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import ProductDescription from "../ProductDescription";
import ProductGallery from "../ProductGallery";
import {createPortal} from "react-dom";

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

const AppContainer: FC = ({}) => {
  return (
    <HashRouter>
      <div className={css.appContainer}>
        {createPortal(
          <div className={css.portal}>
            <ProductGallery
              imagesList={[
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
              ]}
            />
          </div>,
          document.body
        )}
        <Header />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/men" element={<div>men</div>} />
          <Route path="/women" element={<div>women</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Routes>

        <div className={css.product}>
          <div className={css.mainGalleryWrapper}>
            <ProductGallery
              imagesList={[
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
              ]}
            />
          </div>

          <ProductDescription />
        </div>
      </div>
    </HashRouter>
  );
};
export default AppContainer;
