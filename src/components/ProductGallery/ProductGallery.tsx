import {FC, useState} from "react";
import SwiperTypes from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import css from "./ProductGallery.module.scss";
import classNames from "classnames";
import AccessibleFigure from "../AccessibleFigure/AccessibleFigure";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

// import required modules
import {Zoom, Pagination, Navigation, Thumbs} from "swiper/modules";

interface Props {
  imageArray: string[];
  onClickZoom: () => void;
  modal: boolean;
}

const ProductGallery: FC<Props> = ({imageArray, onClickZoom, modal}) => {
  const [swiper, setSwiper] = useState<SwiperTypes | null>(null);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);

  const swiperContents = (hoverActionsAllowed: boolean) => {
    return imageArray.map((slide, index) => (
      <SwiperSlide key={index}>
        <div
          onMouseEnter={() => {
            hoverActionsAllowed && setHoveredImg(slide);
          }}
          onMouseLeave={() => {
            hoverActionsAllowed && setHoveredImg(null);
          }}
          className={classNames(css["mouseover-figure-wrapper"])}
        >
          <AccessibleFigure
            thumbnailUrl={slide}
            hoverActions={hoverActionsAllowed ? slide === hoveredImg : false}
            brand={"brand"}
            model={"model"}
            isLoading={false}
            onLoad={(para) => {
              console.log(para);
            }}
            classDefinition="class-set-1"
          />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className={classNames(css["component-box"])}>
      <div
        className={classNames(
          css["main-gallery-wrapper"],
          modal ? css["main-gallery-wrapper-modal"] : ""
        )}
      >
        <Swiper
          zoom={modal ? {maxRatio: 2} : false}
          onClick={onClickZoom}
          thumbs={{
            swiper: swiper && !swiper.destroyed ? swiper : null,
          }}
          pagination={{clickable: true}}
          modules={[Pagination, Thumbs, Zoom]}
          className={css["main-gallery-swiper"]}
        >
          {swiperContents(false)}
        </Swiper>
      </div>
      <div
        className={classNames(
          css["thumbnail-gallery-wrapper"],
          modal ? css["thumbnail-gallery-wrapper-modal"] : ""
        )}
      >
        <Swiper
          onSwiper={setSwiper}
          navigation={true}
          modules={[Navigation, Thumbs]}
          slidesPerGroup={4}
          speed={300}
          watchSlidesProgress={true}
          slidesPerView={5}
          className={css["thumbnail-gallery-swiper"]}
        >
          {swiperContents(true)}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
