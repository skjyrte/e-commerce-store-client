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
import SizeTableModal from "../../components/modals/SizeTableModal";
import {sizeUpdater, sizeCleanup} from "../../redux/slices/selectedSizeSlice";
import {RootState} from "../../redux/configureStore";
import {changeItemsCount} from "../../redux/slices/responseSlice";
import {addToCart} from "../../redux/slices/cartSlice";

interface Props {}

const ProductView: FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState<null | "size" | "gallery">(
    null
  );
  const {productId} = useParams();

  const dispatch = useDispatch<AppDispatch>();
  if (productId !== undefined) {
    dispatch(productUpdater(productId));
  }

  const selectedProduct = useSelector(selectCurrentProduct);
  const selectedSize = useSelector((state: RootState) => state.size.value);

  if (selectedProduct.result !== null && selectedProduct.error === null) {
    const defaultSizeObject = selectedProduct.result.stock.find(
      (product) => product.count > 0
    );
    {
      dispatch(
        sizeUpdater({size: selectedSize, defaultSizeObject: defaultSizeObject})
      );
    }
  }

  const renderGallery = () => {
    if (selectedProduct.result !== null && selectedProduct.error === null) {
      if (selectedProduct.result.images.length !== 0) {
        return (
          <ProductGallery
            imagesList={selectedProduct.result.images}
            onClickZoom={() => handleOpenModal("gallery")}
          />
        );
      } else {
        return <IconNoPhoto />;
      }
    } else {
      throw new Error("invalid object");
    }
  };

  const onSelectSize = (size: string) => {
    handleCloseModal();
    dispatch(sizeUpdater({size: size, defaultSizeObject: undefined}));
  };

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

  const renderSizes = () => {
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
  };

  const renderDescription = () => {
    if (selectedProduct.result !== null && selectedProduct.error === null) {
      return (
        <ProductDescription
          onClickSize={() => handleOpenModal("size")}
          currentProduct={selectedProduct.result}
          currentSize={selectedSize}
          onAddToBasket={onAddToBasket}
        />
      );
    } else {
      throw new Error("invalid object");
    }
  };

  const handleOpenModal = (modalType: "size" | "gallery") => {
    setModalVisible(modalType);
  };
  const handleCloseModal = () => {
    setModalVisible(null);
  };

  useEffect(() => {
    return () => {
      dispatch(productCleanup());
      dispatch(sizeCleanup());
    };
  }, []);

  return selectedProduct.error !== null ? (
    <InvalidContent />
  ) : (
    <div className={css.product}>
      <PortalModal visible={modalVisible === "size"} lockBodyScroll={true}>
        {renderSizes()}
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
      {renderDescription()}
    </div>
  );
};

export default ProductView;
