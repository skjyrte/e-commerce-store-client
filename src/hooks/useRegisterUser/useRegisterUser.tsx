import {useState} from "react";
import createAxiosInstance from "../../api/createAxiosInstance";
import axios, {AxiosError} from "axios";

const axiosInstance = createAxiosInstance();

interface RegisterUserResponse {
  success: boolean;
  message: string;
  payload?: {email: string};
}

const useRegisterUser = () => {
  const [registerUserData, setRegisterUserData] =
    useState<Nullable<RegisterUserResponse>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    clientMessage: string;
    serverMessage: string;
  } | null>(null);

  const registerUser = async (formData: {
    email: string;
    password: string;
    name: string;
    address: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/auth/register", formData, {
        withCredentials: true,
      });

      if (typeof response === "object" && "data" in response) {
        setRegisterUserData(response.data as RegisterUserResponse);
      } else {
        setRegisterUserData(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<RegisterUserResponse>;

        setRegisterUserData(null);
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
    registerUser,
    registerUserData,
    loading,
    error,
  };
};

export default useRegisterUser;
