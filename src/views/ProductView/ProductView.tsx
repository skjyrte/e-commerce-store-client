import {FC, useState, useRef, useEffect} from "react";
import css from "./ProductView.module.scss";
import PortalModal from "../../components/modals/PortalModal";
import ProductGallery from "../../components/ProductGallery";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/buttons/IconButton";
import IconCross from "../../components/inlineIcons/IconCross";
import {useParams} from "react-router-dom";
import IconNoPhoto from "../../components/inlineIcons/IconNoPhoto";
import useMakeRequest from "../../hooks/useMakeRequest";
import FeaturesAccordion from "../../components/accordions/FeaturesAccordion";

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
  const containerRef = useRef<HTMLDivElement>(null);

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

  const renderGallery = (modal: boolean) => {
    if (product !== null) {
      if (product.image_url_array.length > 0) {
        return (
          <ProductGallery
            imageArray={product.image_url_array}
            onClickZoom={handleOpenModal}
            modal={modal}
          />
        );
      } else {
        return <IconNoPhoto />;
      }
    }
  };

  const renderDescription = () => {
    if (product) {
      return (
        <>
          <ProductDescription currentProduct={product} />
          <FeaturesAccordion product={product} />
        </>
      );
    }
  };

  const handleOpenModal = () => {
    if (modalVisible !== "gallery") setModalVisible("gallery");
  };
  const handleCloseModal = () => {
    setModalVisible(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    const container = containerRef.current;
    if (container) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalVisible]);

  return (
    <>
      <div className={css["product-container"]}>
        <div className={css["inline-gallery-wrapper"]}>
          {renderGallery(false)}
        </div>
        <div className={css["product-description-wrapper"]}>
          {renderDescription()}
        </div>
      </div>
      {/* portal is being created at html root. It does not matter
       where exactly we place it here */}
      <PortalModal visible={modalVisible === "gallery"}>
        <div ref={containerRef} className={css["portal-galery-content"]}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          {renderGallery(true)}
        </div>
      </PortalModal>
    </>
  );
};

export default ProductView;
