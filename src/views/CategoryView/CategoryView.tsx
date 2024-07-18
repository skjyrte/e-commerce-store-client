import {FC, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AxiosResponse, AxiosRequestConfig} from "axios";
/* custom components */
import css from "./CategoryView.module.scss";
import {AppDispatch} from "../../redux/configureStore";
import {switchGender} from "../../redux/slices/selectedGenderSlice";
import createAxiosInstance from "../../api/createAxiosInstance";
import FakeThumbnail from "./FakeThumbnail";

/* api */

const axiosInstance = createAxiosInstance();

interface Product {
  id: string;
  brand: string;
  model: string;
  gender: string;
  category: string;
  material: string;
  season: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: number;
  initialPrice: number;
  ratingReviews: number;
  ratingValue: number;
  thumbnail: string;
  color: string;
}

interface ProductWithStockAndImages extends Product {
  size?: string;
  count?: number;
  image_url?: string;
}

interface ExpectedResponse {
  success: boolean;
  message: string;
  payload?: IncomingData;
}

type IncomingData = ProductWithStockAndImages[];

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
  const [products, setProducts] = useState<null | IncomingData>(null);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

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

  const categoryContent = () => {
    if (products) {
      const someArray = products.map((obj: Product) => (
        <FakeThumbnail id={obj.id} />
      ));
      return someArray;
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (location.pathname === "/men") {
          dispatch(switchGender("men"));
          /* PRINTS MEN */
          await handleGetProducts("men", "sneakers");
        } else if (location.pathname === "/women") {
          dispatch(switchGender("women"));
          /* PRINTS WOMEN */
          await handleGetProducts("women");
        }
      } catch {
        console.log("get products error");
      }
    };

    void getProducts();
  }, [location]);

  return <div className={css.gridWrapper}>{categoryContent()}</div>;
};

export default CategoryView;
