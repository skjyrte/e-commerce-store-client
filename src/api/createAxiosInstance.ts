import axios from "axios";

const createAxiosInstance = () => {
  const config = {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
  };

  return axios.create(config);
};

export const createShortTimeoutAxiosInstance = () => {
  const config = {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
  };

  return axios.create(config);
};

export default createAxiosInstance;
