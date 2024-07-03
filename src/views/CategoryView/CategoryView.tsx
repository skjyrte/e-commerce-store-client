import {FC, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AxiosResponse, AxiosRequestConfig} from "axios";
/* custom components */
import css from "./CategoryView.module.scss";
import CategoryProductThumbnail from "../../components/thumbnails/CategoryProductThumbnail";
import {AppDispatch} from "../../redux/configureStore";
import {selectProductsByCategory} from "../../redux/selectors";
import {switchGender} from "../../redux/slices/selectedGenderSlice";
import createAxiosInstance from "../../api/createAxiosInstance";

/* api */

const axiosInstance = createAxiosInstance();

interface ProductTemp {
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

interface ProductWithStockAndImages extends ProductTemp {
  size?: string;
  count?: number;
  image_url?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: ProductWithStockAndImages[];
}

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
  ) => Promise<AxiosResponse<ApiResponse>>,
  requestConfig: {url: string; data: D; config: AxiosRequestConfig<D>},
  // eslint-disable-next-line no-unused-vars
  successCallback?: (data: ApiResponse) => void,
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

async function handleGetProducts(
  gender: string,
  category: string | undefined = undefined
) {
  handleRequest<ApiResponse>(
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
      console.log("test data:");
      console.log(data);
    },
    () => {
      console.log("error cb");
    }
  );
}

/* component */

const CategoryView: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProductsByCategory);

  const categoryContent = products.map((obj: Product) => (
    <Link key={obj.id} className={css.linkWrapper} to={obj.id.toString()}>
      <CategoryProductThumbnail product={obj} />
    </Link>
  ));

  useEffect(() => {
    if (location.pathname === "/men") {
      dispatch(switchGender("men"));
      /* PRINTS MEN */
      handleGetProducts("men", "sneakers");
    }
    if (location.pathname === "/women") {
      dispatch(switchGender("women"));
      /* PRINTS WOMEN */
      handleGetProducts("women");
    }
  }, [location]);

  return (
    <div className={css.gridWrapper}>
      {categoryContent.length > 0 ? categoryContent : "no products or loading"}
    </div>
  );
};

export default CategoryView;
