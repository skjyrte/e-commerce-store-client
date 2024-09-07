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
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (formData: {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
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
        if (err.response?.status === 400) {
          setError("User with this email already exists.");
        } else if (!serverError.response) {
          setError(
            "We have an error. Please check your network connection and try again later."
          );
        } else {
          setError("We have an error. Please try again later.");
        }
      } else {
        console.error("Unexpected error:", err);
        setError(
          "We have an error. Please check your network connection and try again later."
        );
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
