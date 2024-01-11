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
 * 서버에서 쿠키값 변경 시 next/headers->cookies()
 * 클라이언트에서 쿠키값 변경 시 cookie.ts
 */
const _getSession = () => {
  if (typeof window !== "undefined") {
    return getCookie("nft-session");
  } else {
    const cookies = require("next/headers")?.cookies?.();
    console.log("cookies:", cookies);
    const data = cookies.get("nft-session")?.value;
    console.log("session:", data);
    return data ? JSON.parse(data) : null;
  }
};

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const session = _getSession();

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
