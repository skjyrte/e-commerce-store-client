import {FC, useEffect, useState, useContext} from "react";
import css from "./ProductView.module.scss";
import PortalModal from "../../components/PortalModal";
import ProductGallery from "../../components/ProductGallery";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/Buttons/IconButton";
import IconCross from "../../components/Icons/IconCross";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/configureStore";
import {
  productUpdater,
  productCleanup,
} from "../../redux/counter/selectedProductSlice";
import {selectCurrentProduct} from "../../redux/selectors";
import IconNoPhoto from "../../components/Icons/IconNoPhoto";
import InvalidContent from "../../components/InvalidContent";
import SizeTable from "../../components/SizeTable";
import {sizeUpdater, sizeCleanup} from "../../redux/counter/selectedSizeSlice";
import {RootState} from "../../redux/configureStore";
import {changeItemsCount} from "../../redux/counter/responseSlice";

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
    console.log("defaultSizeObject");
    console.log(defaultSizeObject);
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
          currentProductId: productId,
          currentSize: selectedSize,
          changeBy: changeBy,
        })
      );
    }
  };

  const renderSizes = () => {
    if (selectedProduct.result !== null && selectedProduct.error === null) {
      return (
        <SizeTable
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
