"use client";

import { removeCookie, setCookie } from "@/utils/cookie";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    signIn("email-credentials", {
      username: "testUser",
      password: "qwer1234!",
      redirect: false,
    }).then((res) => {
      console.log("로그인 결과 : ", res);
    });
  };

  const handleSignInGoogle = () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXTAUTH_URL}/test/list`,
    }).then((res) => {
      console.log(res);
      setCookie(
        "nft-session",
        JSON.stringify({ accessToken: "123", tokenType: "asd" })
      );
    });
  };

  const handleSignOut = () =>
    signOut().then(() => {
      removeCookie("nft-session");
    });

  console.log("asdasdasdas;", session);
  console.log(process.env.NEXTAUTH_URL);
  return (
    <div>
      {session ? (
        <>
          <h1>로그인했습니다</h1>
          <div>{session.user?.email}</div>
          <div>{session.user?.name || session.user?.id}</div>
          <button onClick={handleSignOut}>로그아웃</button>
        </>
      ) : (
        <>
          <h1>환영합니다!</h1>
          <p>로그인하려면 아래 버튼을 클릭하세요:</p>
          <button onClick={handleSignIn}>로그인</button>
          <br />
          <button onClick={handleSignInGoogle}>구글 로그인</button>
        </>
      )}
    </div>
  );
}
