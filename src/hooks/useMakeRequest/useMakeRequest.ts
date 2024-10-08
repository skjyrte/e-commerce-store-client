import {useState, useEffect, useMemo} from "react";
import axios, {AxiosResponse, AxiosRequestConfig} from "axios";
import createAxiosInstance from "../../api/createAxiosInstance";

interface ResponseObject<T> {
  success: boolean;
  message: string;
  payload?: T[];
}

enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface GetConfig {
  gender?: string;
  category?: string;
  id?: string;
}

interface ErrorObject {
  status?: number;
  statusText: string;
}

const axiosInstance = createAxiosInstance();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAxiosWrapper = <T, R = AxiosResponse<ResponseObject<T>>, D = any>(
  url: string,
  data: Record<string, never>,
  config: AxiosRequestConfig<D>
) => {
  return axiosInstance.get<T, R, D>(url, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRequest = async <T, D = any>(
  requestPromise: (
    url: string,
    data: D,
    config: AxiosRequestConfig<D>
  ) => Promise<AxiosResponse<ResponseObject<T>>>,
  requestConfig: {url: string; data: D; config: AxiosRequestConfig<D>},
  successCallback?: (data: ResponseObject<T>) => void,
  failureCallback?: (error: unknown) => void,
  loaderCallback?: (loader: string | null) => void,
  loaderType?: string
): Promise<void> => {
  try {
    if (loaderCallback && loaderType) {
      loaderCallback(loaderType);
    }

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
    if (loaderCallback) {
      loaderCallback(null);
    }
  } catch (e) {
    console.error(e);

    if (axios.isCancel(e)) {
      return;
    }

    if (failureCallback) {
      failureCallback(e);
    }
    if (loaderCallback) {
      loaderCallback(null);
    }
  }
};

const createFilterQuery = (config: GetConfig) => {
  const {gender, category, id} = config;
  try {
    if (id) {
      return `/product/${id}`;
    } else if (category) {
      return `/gender/${gender ? gender : ""}/category/${category}`;
    } else {
      return `/gender/${gender ? gender : ""}`;
    }
  } catch (e) {
    console.error(e);
    return "";
  }
};

//ANCHOR - Hook
function useMakeRequest<
  T extends ProductBasicDataResponse | ProductExtraDataResponse,
>(requestType: RequestType, config: GetConfig) {
  const [responseData, setResponseData] = useState<null | T[]>(null);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [loader, setLoader] = useState<string | null>(null);

  const memoConfig = useMemo(
    () => config,
    [config.gender, config.category, config.id]
  );

  const handleGetData = async (config: GetConfig) => {
    setError(null);
    await handleRequest<T>(
      getAxiosWrapper<T>,
      {
        url: createFilterQuery(config),
        data: {},
        config: {
          params: {},
        },
      },
      (data) => {
        if (data.payload) {
          setResponseData(data.payload);
        }
      },
      (e) => {
        if (axios.isAxiosError(e) && e.response) {
          setError({
            status: e.response.status,
            statusText: e.response.statusText,
          });
        } else {
          setError({statusText: "unknown error"});
        }
        setResponseData(null);
        console.error(e);
      },
      (loader) => {
        if (loader) setResponseData(null);
        setLoader(loader);
      },
      RequestType.GET
    );
  };

  const handleRequestType = async (
    requestType: RequestType,
    config: GetConfig
  ) => {
    try {
      switch (requestType) {
        case RequestType.GET:
          await handleGetData(config);
          break;
        case RequestType.PUT:
          console.log("PUT");
          break;
        case RequestType.POST:
          console.log("POST");
          break;
        case RequestType.DELETE:
          console.log("DELETE");
          break;
        default:
          throw new Error("Invalid request type");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const asyncFunction = async () => {
      await handleRequestType(requestType, config);
    };
    void asyncFunction();
  }, [requestType, memoConfig]);

  return {responseData, error, loader};
}

export default useMakeRequest;
