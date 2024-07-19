import {useState, useEffect} from "react";
import {AxiosResponse, AxiosRequestConfig} from "axios";
import createAxiosInstance from "../../api/createAxiosInstance";

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
    url: string,
    data: D,
    config: AxiosRequestConfig<D>
  ) => Promise<AxiosResponse<ExpectedResponse>>,
  requestConfig: {url: string; data: D; config: AxiosRequestConfig<D>},
  successCallback?: (data: ExpectedResponse) => void,
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
}

const useMakeRequest = (requestType: RequestType, config: GetConfig) => {
  const [responseData, setResponseData] = useState<null | ProductWithData[]>(
    null
  );

  async function handleGetData(config: GetConfig) {
    const createFilterQuery = (config: GetConfig) => {
      const {gender, category} = config;
      try {
        if (gender) {
          if (category) {
            return `/gender/${gender}/category/${category}`;
          } else {
            return `/gender/${gender}`;
          }
        } else throw new Error("gender not defined");
      } catch (e) {
        console.error(e);
        return "";
      }
    };

    await handleRequest<ExpectedResponse>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getAxiosWrapper<any>,
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
  }, [requestType, config]);

  return responseData;
};

export default useMakeRequest;
