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

interface Props {
  imagesList: string[];
}

const ProductView: FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {productId} = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const selectedProduct = useSelector(selectCurrentProduct);
  const imagesList = selectedProduct?.images;

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(productUpdater(productId));
    return () => {
      dispatch(productCleanup());
    };
  }, []);

  return (
    <div className={css.product}>
      <div className={css.mainGalleryWrapper}>
        {imagesList === undefined ? (
          "loading or empty"
        ) : (
          <ProductGallery
            imagesList={imagesList}
            onClickZoom={handleOpenModal}
          />
        )}
      </div>
      <PortalModal visible={modalVisible}>
        <div className={css.portalGalleryWrapper}>
          <IconButton
            onClick={handleCloseModal}
            IconComponent={IconCross}
            buttonClass={["closeModalButton"]}
          />
          {imagesList === undefined ? (
            "loading or empty"
          ) : (
            <ProductGallery
              imagesList={imagesList}
              onClickZoom={handleOpenModal}
            />
          )}
        </div>
      </PortalModal>
      {selectedProduct === undefined ? (
        "loading or empty"
      ) : (
        <ProductDescription currentProduct={selectedProduct} />
      )}
    </div>
  );
};

export default ProductView;
