"use client";
import { AlertModal } from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { useAuthStore } from "@/stores/authStore";
import { popupCenter } from "@/utils/popup";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const handleSignIn = async () => {
    try {
      // signIn 함수를 호출하여 로그인을 시작합니다.
      await signIn("google", {
        callbackUrl: `${window.location.href}test/login`,
      }); // 'google'은 사용할 인증 제공자의 이름입니다.
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>환영합니다!</h1>
      <p>로그인하려면 아래 버튼을 클릭하세요:</p>
      <button onClick={handleSignIn}>Google로 로그인</button>
    </div>
  );
}
