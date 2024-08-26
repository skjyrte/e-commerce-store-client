import {FC, useState, useRef} from "react";
import {Link} from "react-router-dom";
import css from "./ProductsSwiper.module.scss";
import useMakeRequest from "../../hooks/useMakeRequest";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import CategoryProductPlaceholder from "../../components/loaders/CategoryProductPlaceholder/CategoryProductPlaceholder";
import {Swiper, SwiperSlide} from "swiper/react";
import IconButton from "../buttons/IconButton";
import IconNarrowArrowNext from "../inlineIcons/IconNarrowArrowNext";
import IconNarrowArrowPrev from "../inlineIcons/IconNarrowArrowPrev";
import classNames from "classnames";
import {Navigation, Thumbs, Scrollbar, Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Props {
  category: string;
  gender: string;
  headerText: string;
  index: number;
}

const ProductsSwiper: FC<Props> = (props) => {
  const [hoveredID, setHoveredID] = useState<null | string>(null);

  const {category, gender, headerText, index} = props;

  const request = useMakeRequest<ProductBasicDataResponse>(RequestType.GET, {
    gender,
    category,
  });

  const products = request.responseData;
  const error = request.error;

  if (products && !error) {
  }

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  const swiperContent = () => {
    const placeholderArray = new Array(6).fill("placeholder");
    if (error) {
      return null;
    } else if (request.loader) {
      return placeholderArray.map((_, index) => (
        <SwiperSlide key={index}>
          <div>
            <CategoryProductPlaceholder key={index} />
          </div>
        </SwiperSlide>
      ));
    } else if (products) {
      return products.map((obj: ProductBasicDataResponse) => (
        <SwiperSlide key={obj.id}>
          <div className={css["products-slider-thumbnail-wrapper"]}>
            <Link
              key={obj.id}
              className={css.linkWrapper}
              to={`/product/${obj.id}`}
            >
              <CategoryProductThumbnail
                key={obj.id}
                productData={obj}
                onHover={onThumbnailHover}
                hovered={hoveredID === obj.id}
                showSizeTable={false}
              />
            </Link>
          </div>
        </SwiperSlide>
      ));
    } else {
      return null;
    }
  };

  return (
    <div
      className={classNames(
        css["component-container"],
        css["swiper-background"]
      )}
      style={
        {
          "--swiper-color": `var(--swiper-color-${index.toString()})`,
        } as React.CSSProperties
      }
    >
      {!products && !request.loader ? (
        <div className={css["no-products-avaiable"]}></div>
      ) : (
        <>
          <div className={css["component-background-banner"]}></div>
          <div className={css["swiper-content"]}>
            <div className={css["products-swiper-header"]}>
              <div className={css["products-swiper-title"]}> {headerText} </div>
              <div className={css["swiper-buttons-group"]}>
                <div
                  ref={prevRef}
                  className={classNames(
                    css["icon-button-wrapper"],
                    css["icon-button-wrapper-prev"]
                  )}
                >
                  <IconButton IconComponent={IconNarrowArrowPrev} />
                </div>
                <div
                  ref={nextRef}
                  className={classNames(
                    css["icon-button-wrapper"],
                    css["icon-button-wrapper-next"]
                  )}
                >
                  <IconButton IconComponent={IconNarrowArrowNext} />
                </div>
              </div>
            </div>
            <Swiper
              navigation={{
                enabled: true,
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              modules={[Navigation, Thumbs, Scrollbar, Autoplay]}
              autoplay={{
                pauseOnMouseEnter: true,
                delay: 2000 * Math.random() + 5000,
              }}
              scrollbar={{
                enabled: true,
                draggable: true,
              }}
              spaceBetween={20}
              speed={300}
              watchSlidesProgress={true}
              slidesPerView={1}
              breakpoints={{
                600: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              className={"thumbnail-gallery-swiper"}
            >
              {swiperContent() ? (
                swiperContent()
              ) : (
                <div className={css["no-products-box"]}>
                  No products avaiable
                </div>
              )}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsSwiper;
