import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { getCookie } from "./cookie";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
  },
});

/**
 * 서버 컴포넌트에서 localStorage 값을 가져올 수 없어서 토큰은 쿠키에 넣어서 관리.
 */
const getSession = () => {
  if (typeof window !== "undefined") {
    return getCookie("nft-session");
  } else {
    const data = require("next/headers")?.cookies?.().get("nft-session")?.value;
    console.log("session:", data);
    return data ? JSON.parse(data) : null;
  }
};

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const session = getSession();

    if (session) {
      const { accessToken, tokenType } = session;

      if (accessToken && tokenType && config.headers) {
        config.headers.Authorization = `${tokenType} ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<any>) => {
    return Promise.reject(error);
  }
);

export default instance;
