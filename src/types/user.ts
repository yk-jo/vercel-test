// 샘플

export type UserLoginReqType = {
  id: string;
  password: string;
};

export type UserLoginResType = {
  accessToken: string;
  expiresIn: number;
  jti: string;
  passwordChangeNeed: boolean;
  refreshToken: string;
  scope: string;
  snsId: string | null;
  tokenType: string;
};
