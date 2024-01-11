// 샘플

import { UserLoginReqType, UserLoginResType } from "@/types/user";
import instance from "@/utils/axiosInstance";

const userLogin = async (data: UserLoginReqType) => {
  try {
    const res = await instance.post<UserLoginResType>(
      `/api/v1/users/login`,
      data
    );

    return res;
  } catch (e) {
    throw e;
  }
};

export { userLogin };
