"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      // signIn 함수를 호출하여 로그인을 시작합니다.
      const result = await signIn("email-credentials", {
        username: "testUser",
        password: "qwer1234!",
        redirect: false,
      }); // 'google'은 사용할 인증 제공자의 이름입니다.
      console.log("로그인 결과 : ", result);
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  };
  const handleSignOut = () => signOut();
  console.log("asdasdasdas;", session);
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
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: `${process.env.NEXTAUTH_URL}/test/list`,
              })
            }
          >
            구글 로그인
          </button>
        </>
      )}
    </div>
  );
}
