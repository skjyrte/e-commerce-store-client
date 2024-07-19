import {FC, useEffect, useState} from "react";
import {AxiosResponse, AxiosRequestConfig} from "axios";
import {useParams} from "react-router-dom";
/* custom components */
import css from "./CategoryView.module.scss";
import createAxiosInstance from "../../api/createAxiosInstance";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";

/* api */

const axiosInstance = createAxiosInstance();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAxiosWrapper<T, R = AxiosResponse<T>, D = any>(
  url: string,
  data: Record<string, never>,
  config: AxiosRequestConfig<D>
) {
  return axiosInstance.get<T, R, D>(url, config);
}
// eslint-disable-next-line
async function handleRequest<T, D = any>(
  requestPromise: (
    // eslint-disable-next-line no-unused-vars
    url: string,
    // eslint-disable-next-line no-unused-vars
    data: D,
    // eslint-disable-next-line no-unused-vars
    config: AxiosRequestConfig<D>
  ) => Promise<AxiosResponse<ExpectedResponse>>,
  requestConfig: {url: string; data: D; config: AxiosRequestConfig<D>},
  // eslint-disable-next-line no-unused-vars
  successCallback?: (data: ExpectedResponse) => void,
  // eslint-disable-next-line no-unused-vars
  failureCallback?: (error: unknown) => void
): Promise<void> {
  try {
    const response = await requestPromise(
      requestConfig.url,
      requestConfig.data,
      requestConfig.config
    );

    if (successCallback) {
      if (typeof response === "object" && "data" in response) {
        successCallback(response.data);
      }
    }
  } catch (err) {
    console.log(err);
    if (failureCallback) {
      failureCallback(err);
    }
  }
}

/* component */

const CategoryView: FC = () => {
  const [products, setProducts] = useState<null | ProductWithData[]>(null);
  const [hoveredID, setHoveredID] = useState<null | string>(null);

  const {gender} = useParams();
  console.log(gender);

  async function handleGetProducts(
    gender: string,
    category: string | undefined = undefined
  ) {
    await handleRequest<ExpectedResponse>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getAxiosWrapper<any>,
      {
        url:
          category !== undefined
            ? `/gender/${gender}/category/${category}`
            : `/gender/${gender}`,
        data: {},
        config: {
          params: {},
        },
      },
      (data) => {
        if (data.payload) {
          setProducts(data.payload);
        }
      },
      () => {
        console.log("error cb");
      }
    );
  }

  const onThumbnailHover = (id: null | string) => {
    setHoveredID(id);
  };

  const categoryContent = () => {
    if (products) {
      const someArray = products.map((obj: Product) => (
        <CategoryProductThumbnail
          key={obj.id}
          productData={obj}
          onHover={onThumbnailHover}
          hovered={hoveredID === obj.id ? true : false}
        />
      ));
      return someArray;
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (gender !== undefined) {
          await handleGetProducts(gender);
        }
      } catch {
        console.log("get products error");
      }
    };

    void getProducts();
  }, [gender]);

  return <div className={css.gridWrapper}>{categoryContent()}</div>;
};

export default CategoryView;
