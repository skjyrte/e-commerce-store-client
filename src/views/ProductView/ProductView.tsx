import {FC, useState} from "react";
import css from "./ProductView.module.scss";
import PortalModal from "../../components/modals/PortalModal";
import ProductGallery from "../../components/ProductGallery";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/buttons/IconButton";
import IconCross from "../../components/icons/IconCross";
import {useParams} from "react-router-dom";
import IconNoPhoto from "../../components/icons/IconNoPhoto";
import SizeTableModal from "../../components/modals/SizeTableModal";
import useMakeRequest from "../../hooks/useMakeRequest";
import FeaturesAccordion from "../../components/FeaturesAccordion";

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
  const [selectedSize, setSelectedSize] = useState<null | string>(null);

  const {id} = useParams();
  const response = useMakeRequest<ProductExtraDataResponse>(RequestType.GET, {
    id,
  });

  const products = response.responseData;

  const product = products ? products[0] : null;
  const defaultSize = product
    ? product.stock_array.find((sizeObj) => sizeObj.count > 0)
    : null;
  if (!selectedSize && defaultSize) {
    setSelectedSize(defaultSize.size);
  }

  const handleGaleryModal = () => {
    if (modalVisible !== "gallery") setModalVisible("gallery");
  };

  const renderGallery = (modal: boolean) => {
    if (product !== null) {
      if (product.image_url_array.length > 0) {
        return (
          <ProductGallery
            imageArray={product.image_url_array}
            onClickZoom={handleGaleryModal}
            modal={modal}
          />
        );
      } else {
        return <IconNoPhoto />;
      }
    }
  };

  const onSelectSize = (size: string) => {
    setSelectedSize(size);
    handleCloseModal();
  };

  const renderSizes = () => {
    if (selectedSize !== null && product) {
      return (
        <SizeTableModal
          sizesArray={product.stock_array}
          onClick={onSelectSize}
        />
      );
    }
  };

  const renderDescription = () => {
    if (product !== null) {
      return (
        <ProductDescription
          onClickSize={() => {
            handleOpenModal("size");
          }}
          currentProduct={product}
          currentSize={selectedSize}
          //eslint-disable-next-line
          onAddToBasket={() => {}}
        />
      );
    }
  };

  const handleOpenModal = (modalType: "size" | "gallery") => {
    setModalVisible(modalType);
  };

  const handleCloseModal = () => {
    setModalVisible(null);
  };

  return (
    <div className={css.product}>
      <PortalModal visible={modalVisible === "size"} lockBodyScroll={true}>
        {renderSizes()}
        <IconButton
          onClick={handleCloseModal}
          IconComponent={IconCross}
          buttonClass={["closeModalButton", "size"]}
        />
      </PortalModal>
      <div className={css.mainGalleryWrapper}>{renderGallery(false)}</div>
      <PortalModal visible={modalVisible === "gallery"}>
        <div className={css.portalGalleryWrapper}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          {renderGallery(true)}
        </div>
      </PortalModal>
      <div className={css.descriptionWrapper}>
        {renderDescription()}
        {product ? <FeaturesAccordion product={product} /> : <></>}
      </div>
    </div>
  );
};

export default ProductView;
