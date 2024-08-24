import {useState} from "react";
import createAxiosInstance from "../../api/createAxiosInstance";
import axios, {AxiosError} from "axios";

const axiosInstance = createAxiosInstance();

interface LoginResponse {
  success: boolean;
  message: string;
  payload?: {email: string};
}

const useLogin = () => {
  const [loginData, setLoginData] = useState<Nullable<LoginResponse>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    clientMessage: string;
    serverMessage: string;
  } | null>(null);

  const loginRequest = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {email, password},
        {withCredentials: true}
      );

      if (typeof response === "object" && "data" in response) {
        setLoginData(response.data as LoginResponse);
      } else {
        setLoginData(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<LoginResponse>;

        setLoginData(null);

        if (!serverError.response) {
          setError({
            clientMessage:
              "We have an error. Please check your network connection and try again later.",
            serverMessage: "No response received from the server.",
          });
        } else {
          setError({
            clientMessage: "We have an error. Please check your credentials.",
            serverMessage: error?.serverMessage ?? "Unexpected error occurred.",
          });
        }
      } else {
        console.error("Unexpected error:", err);
        setError({
          clientMessage:
            "We have an error. Please check your network connection and try again later.",
          serverMessage:
            error?.serverMessage ?? "Failed to communicate with the server.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loginRequest,
    loginData,
    loading,
    error,
  };
};

export default useLogin;
