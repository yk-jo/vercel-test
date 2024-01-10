// 샘플
import { AlertModal } from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { UserLoginReqType, UserLoginResType } from "@/types/user";
import instance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const API = {
  userLogin: async (data: UserLoginReqType) =>
    await instance.post<UserLoginResType>(`/api/v1/users/login`, data),
};

export function useUserLogin() {
  const { openModal } = useModal();

  return useMutation(API.userLogin, {
    onSuccess: (data) => console.log(data),
    onError: (e: AxiosError<any>) => {
      const { message } = e.response?.data;
      openModal(AlertModal, { message });
    },
  });
}
