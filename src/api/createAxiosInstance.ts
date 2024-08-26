import axios from "axios";

const createAxiosInstance = () => {
  const config = {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    timeout: 120000,
  };

  return axios.create(config);
};

export default createAxiosInstance;
