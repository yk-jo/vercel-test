import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };

export function generateStaticParams() {
  return [
    { nextauth: ["session"] },
    { nextauth: ["error"] },
    { nextauth: ["_log"] },
    { nextauth: ["google"] },
  ];
}
