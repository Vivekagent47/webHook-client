import axios, { AxiosError } from "axios";

export const BaseUrl = import.meta.env.VITE_APP_STAGING_BAPI;
const AxiosInstance = axios.create({ baseURL: BaseUrl });

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "*/*";

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response.data;
  },
  (error: AxiosError) => {
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error.response?.data);
  },
);

export default AxiosInstance;
