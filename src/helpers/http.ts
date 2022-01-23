import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { httpErrorHandler } from "@/helpers/error";

const http: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Cache-Control": "no-cache",
  },
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token =
      JSON.parse(sessionStorage.getItem("access_token") as string) || null;
    if (token) {
      config.headers.Authorization = `${token.type} ${token.value}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    httpErrorHandler(error);
    return Promise.reject(error);
  }
);

export default http;
