import {FC, useState} from "react";
import css from "./ProductView.module.scss";
import ProductGallery from "../../components/ProductGallery";
import PortalModal from "../../components/PortalModal";
import ProductDescription from "../../components/ProductDescription";
import IconButton from "../../components/Buttons/IconButton";
import IconCross from "../../components/Icons/IconCross";

interface Props {
  imagesList: string[];
}

const ProductView: FC<Props> = ({imagesList}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={css.product}>
      <div className={css.mainGalleryWrapper}>
        <ProductGallery imagesList={imagesList} onClickZoom={handleOpenModal} />
      </div>
      <PortalModal visible={modalVisible}>
        <div className={css.portalGalleryWrapper}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          <ProductGallery imagesList={imagesList} />
        </div>
      </PortalModal>
      <ProductDescription />
    </div>
  );
};

export default ProductView;
