import {FC, useEffect, useState, useContext} from "react";
import css from "./ProductView.module.scss";
import ProductGallery from "../../components/ProductGallery";
import PortalModal from "../../components/PortalModal";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/Buttons/IconButton";
import IconCross from "../../components/Icons/IconCross";
import {useParams} from "react-router-dom";
import {ApiResponseContext} from "../../components/AppContainer/AppContainer";

interface Props {
  imagesList: string[];
}

const ProductView: FC<Props> = ({imagesList}) => {
  const [context, setContext] = useContext(ApiResponseContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const {productId} = useParams();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Perform data fetching based on productId
  }, [productId]);

  return (
    <div className={css.product}>
      <div className={css.mainGalleryWrapper}>
        <ProductGallery productId={productId} onClickZoom={handleOpenModal} />
      </div>
      <PortalModal visible={modalVisible}>
        <div className={css.portalGalleryWrapper}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          <ProductGallery productId={productId} />
        </div>
      </PortalModal>
      <ProductDescription productId={productId} />
    </div>
  );
};

export default ProductView;
