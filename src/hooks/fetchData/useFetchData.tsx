import {useState} from "react";
import {AxiosResponse, AxiosRequestConfig} from "axios";

/* custom components */
import createAxiosInstance from "../../api/createAxiosInstance";

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

type requestType = "GET" | "POST";

const useMakeRequest = (
  requestType: requestType,
  gender: string,
  category: string | undefined = undefined
) => {
  const [responseData, setResponseData] = useState<null | ProductWithData[]>(
    null
  );

  async function handleGetData(
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
          setResponseData(data.payload);
        }
      },
      (e) => {
        setResponseData(null);
        console.error(e);
      }
    );
  }

  if (requestType === "GET") {
    const getData = async () => {
      try {
        await handleGetData(gender, category);
      } catch {
        console.log("get data error");
      }
    };

    void getData();
  }
  return responseData;
};

export default useMakeRequest;
