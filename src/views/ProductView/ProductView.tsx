import {FC, useState} from "react";
import css from "./ProductView.module.scss";
import ProductGallery from "../../components/ProductGallery";
import PortalModal from "../../components/PortalModal";
import ProductDescription from "../../components/ProductDescription";

interface Props {
    imagesList: string[]
}

const ProductView: FC<Props> = ({ imagesList }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleOpenModal = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <div className={css.product}>
            <div className={css.mainGalleryWrapper}>
                <ProductGallery
                    imagesList={imagesList}
                />
            </div>
            <button onClick={handleOpenModal}>Open Modal</button>
            <PortalModal visible={modalVisible} >
                <button onClick={handleCloseModal}>Close modal</button>
                <div className={css.portalGalleryWrapper}>
                    <ProductGallery
                        imagesList={imagesList}
                    />
                </div>
            </PortalModal>
            <ProductDescription />
        </div>
    )
}

export default ProductView