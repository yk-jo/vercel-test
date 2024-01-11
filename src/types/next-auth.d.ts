import NextAuth, { DefaultSession, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * NOTE :: email-credentials
   */
  interface User {
    accessToken: string;
    expiresIn: number;
    jti: string;
    passwordChangeNeed: boolean;
    refreshToken: string;
    scope: string;
    snsId: string | null;
    tokenType: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: User;
  }
}
