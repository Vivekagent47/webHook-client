import axios, { AxiosError } from "axios";

export const BaseUrl = "http://localhost:3000";

const AxiosInstance = axios.create({ baseURL: BaseUrl });

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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
  (response: any) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  (error: AxiosError) => {
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  },
);

export default AxiosInstance;
