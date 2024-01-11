import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import apis from "@/apis";
import { cookies } from "next/headers";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "email-credentials",
      name: "email-credentials",
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { username, password } = credentials;
        try {
          const res = await apis.Users.userLogin({ id: username, password });
          const { accessToken, tokenType } = res.data;
          cookies().set(
            "nft-session",
            JSON.stringify({ accessToken, tokenType })
          );
          return { ...res.data, id: username };
        } catch (e: any) {
          throw e;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ account, user, token }) {
      if (account && user) return { ...token, user };
      return { ...token };
    },
    async session(payload) {
      const { session, token } = payload;
      return { ...session, ...token };
    },
  },
});

export { handler as GET, handler as POST };
