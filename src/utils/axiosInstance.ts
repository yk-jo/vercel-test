import { AlertModal } from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { useAuthStore } from "@/stores/authStore";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { useCallback } from "react";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
  },
});

export function useAxiosInterceptor() {
  const { accessToken, tokenType, clear } = useAuthStore();
  const { openModal } = useModal();

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && tokenType && config.headers) {
        config.headers.Authorization = `${tokenType} ${accessToken}`;
      }
      return config;
    },
    [accessToken, tokenType]
  );

  const responseErrorInterceptor = useCallback(
    (error: AxiosError<any>) => {
      if (
        error.response?.status === 403 &&
        error.response?.data.code === "IS_FORBIDDEN"
      ) {
        openModal(AlertModal, {
          key: "ERROR_403",
          message: error.response?.data.message,
          onSubmit: () => {
            clear();
          },
        });
      }
      return Promise.reject(error);
    },
    [clear, openModal]
  );
  const register = useCallback(() => {
    instance.interceptors.request.use(requestInterceptor, function (error) {
      return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
      return response;
    }, responseErrorInterceptor);
  }, [requestInterceptor, responseErrorInterceptor]);

  register();
}

export default instance;
