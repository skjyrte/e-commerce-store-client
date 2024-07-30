import {FC, useEffect, useState} from "react";
import css from "./ProductView.module.scss";
import PortalModal from "../../components/modals/PortalModal";
import ProductGallery from "../../components/ProductGallery";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/buttons/IconButton";
import IconCross from "../../components/icons/IconCross";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {
  productUpdater,
  productCleanup,
} from "../../redux/slices/selectedProductSlice";
import {selectCurrentProduct} from "../../redux/selectors";
import IconNoPhoto from "../../components/icons/IconNoPhoto";
import InvalidContent from "../../components/InvalidContent";
/* import SizeTableModal from "../../components/modals/SizeTableModal"; */
import {RootState} from "../../redux/configureStore";
import {changeItemsCount} from "../../redux/slices/responseSlice";
import {addToCart} from "../../redux/slices/cartSlice";
import useMakeRequest from "../../hooks/useMakeRequest";

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const ProductView: FC = () => {
  const [modalVisible, setModalVisible] = useState<null | "size" | "gallery">(
    null
  );
  const {id} = useParams();

  const products = useMakeRequest(RequestType.GET, {
    id,
    baseUrl: process.env.REACT_APP_API_URL,
  });

  const renderGallery = () => {
    if (products !== null) {
      console.log({products});
      if (products[0].image_url && products[0].image_url.length > 0) {
        return (
          <ProductGallery
            imagesList={products[0].image_url}
            onClickZoom={() => {
              handleOpenModal("gallery");
            }}
          />
        );
      } else {
        return <IconNoPhoto />;
      }
    } else {
      return;
    }
  };

  /*   const onSelectSize = (size: string) => {
    handleCloseModal();
    dispatch(sizeUpdater({size: size, defaultSizeObject: undefined}));
  }; */
  /* 
  const onAddToBasket = (changeBy: number) => {
    if (productId !== undefined && selectedSize !== null) {
      dispatch(
        changeItemsCount({
          id: productId,
          size: selectedSize,
          changeBy: changeBy,
        })
      );
      dispatch(
        addToCart({
          id: productId,
          size: selectedSize,
          changeBy: changeBy,
        })
      );
    }
  };
 */
  /*   const renderSizes = () => {
    if (selectedProduct.result !== null && selectedProduct.error === null) {
      return (
        <SizeTableModal
          sizesArray={selectedProduct.result.stock}
          onClick={onSelectSize}
        />
      );
    } else {
      throw new Error("invalid object");
    }
  }; */
  /* 
  const renderDescription = () => {
    if (selectedProduct.result !== null && selectedProduct.error === null) {
      return (
        <ProductDescription
          onClickSize={() => {
            handleOpenModal("size");
          }}
          currentProduct={selectedProduct.result}
          currentSize={selectedSize}
          onAddToBasket={onAddToBasket}
        />
      );
    } else {
      throw new Error("invalid object");
    }
  }; */

  const handleOpenModal = (modalType: "size" | "gallery") => {
    setModalVisible(modalType);
  };
  const handleCloseModal = () => {
    setModalVisible(null);
  };

  return (
    <div className={css.product}>
      <PortalModal visible={modalVisible === "size"} lockBodyScroll={true}>
        {/* renderSizes() */}
        <IconButton
          onClick={handleCloseModal}
          IconComponent={IconCross}
          buttonClass={["closeModalButton", "size"]}
        />
      </PortalModal>
      <div className={css.mainGalleryWrapper}>{renderGallery()}</div>
      <PortalModal visible={modalVisible === "gallery"}>
        <div className={css.portalGalleryWrapper}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          {renderGallery()}
        </div>
      </PortalModal>
      {/* renderDescription() */}
    </div>
  );
};

export default ProductView;
