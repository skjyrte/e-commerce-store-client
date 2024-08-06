import {useState, useEffect, useMemo} from "react";
import {AxiosResponse, AxiosRequestConfig} from "axios";
import createAxiosInstance from "../../api/createAxiosInstance";

const axiosInstance = createAxiosInstance();

interface ResponseObject<T> {
  success: boolean;
  message: string;
  payload?: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAxiosWrapper<T, R = AxiosResponse<ResponseObject<T>>, D = any>(
  url: string,
  data: Record<string, never>,
  config: AxiosRequestConfig<D>
) {
  return axiosInstance.get<T, R, D>(url, config);
}

// eslint-disable-next-line
async function handleRequest<T, D = any>(
  requestPromise: (
    url: string,
    data: D,
    config: AxiosRequestConfig<D>
  ) => Promise<AxiosResponse<ResponseObject<T>>>,
  requestConfig: {url: string; data: D; config: AxiosRequestConfig<D>},
  successCallback?: (data: ResponseObject<T>) => void,
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
  baseUrl?: string;
}

const useMakeRequest = <
  T extends ProductBasicDataResponse | ProductExtraDataResponse,
>(
  requestType: RequestType,
  config: GetConfig
) => {
  const [responseData, setResponseData] = useState<null | T[]>(null);

  const memoConfig = useMemo(
    () => config,
    [config.gender, config.category, config.id, config.baseUrl]
  );

  async function handleGetData(config: GetConfig) {
    const {baseUrl} = config;
    const createFilterQuery = (config: GetConfig) => {
      const {gender, category, id} = config;
      console.log("id passed to a hook");
      console.log(id);
      try {
        if (id) {
          return `/product/${id}`;
        } else if (gender) {
          if (category) {
            return `/gender/${gender}/category/${category}`;
          } else {
            return `/gender/${gender}`;
          }
        } else return "";
      } catch (e) {
        console.error(e);
        return "";
      }
    };

    const createUrl = (baseUrl: unknown, toAppend: unknown) => {
      console.log("logs to be deleted:");
      console.log({baseUrl});
      console.log({toAppend});
      if (typeof baseUrl !== "string" || typeof toAppend !== "string") {
        throw new Error("invalid url");
      } else {
        return baseUrl + toAppend;
      }
    };

    await handleRequest<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getAxiosWrapper<any>,
      {
        url: createUrl(baseUrl, createFilterQuery(config)),
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
        setResponseData(null);
        console.error(e);
      }
    );
  }

  async function handleRequestType(requestType: RequestType) {
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
  }

  useEffect(() => {
    const asyncFunction = async () => {
      await handleRequestType(requestType);
    };
    void asyncFunction();
  }, [requestType, memoConfig]);

  return responseData;
};

export default useMakeRequest;
