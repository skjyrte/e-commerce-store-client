import {useState} from "react";
import createAxiosInstance from "../../api/createAxiosInstance";
import axios, {AxiosError} from "axios";

const axiosInstance = createAxiosInstance();

interface LoginResponse {
  success: boolean;
  message: string;
  payload?: {email: string};
}

const useCheckSession = () => {
  const [checkSessionData, setCheckSessionData] =
    useState<Nullable<LoginResponse>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSessionRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/auth/check-session", {
        withCredentials: true,
      });

      if (typeof response === "object" && "data" in response) {
        setCheckSessionData(response.data as LoginResponse);
      } else {
        setCheckSessionData(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<LoginResponse>;

        setCheckSessionData(null);

        if (!serverError.response) {
          setError("No response from server");
        } else {
          setError("User not authorized");
        }
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    checkSessionRequest,
    checkSessionData,
    loading,
    error,
  };
};

export default useCheckSession;
