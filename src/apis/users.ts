// 샘플

import { UserLoginReqType, UserLoginResType } from "@/types/user";
import instance from "@/utils/axiosInstance";
import { setCookie } from "@/utils/cookie";

const userLogin = async (data: UserLoginReqType) => {
  try {
    const res = await instance.post<UserLoginResType>(
      `/api/v1/users/login`,
      data
    );
    const { accessToken, tokenType } = res.data;
    setCookie("nft-session", JSON.stringify({ accessToken, tokenType }));

    return res;
  } catch (e) {
    throw e;
  }
};

export { userLogin };
