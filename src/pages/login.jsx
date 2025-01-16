import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from "@/lib/axios"; // axios 가져오기
import { useRouter } from "next/router";
import EmailInput from "@/components/shared/EmailInput";
import PasswordInput from "@/components/shared/PasswordInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useAuth } from "@/contexts/AuthProvider"; // AuthProvider에서 context 가져오기

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // login 함수 가져오기

  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [emailError, setEmailError] = useState(false); // 이메일 유효성 에러 상태
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // 메시지 상태

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 정규식
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setEmailError(true);
      setMessage("올바른 이메일을 입력해 주세요.");
      return;
    }

    setEmailError(false); // 유효성 통과 시 에러 해제
    setLoading(true);

    try {
      // login 함수 호출
      await login({ email, password }); // AuthProvider에서 제공한 로그인 함수 사용
      setMessage("로그인 성공! 환영합니다.");

      // 로그인 상태가 업데이트된 뒤 페이지 이동
      router.push('/me');
    } catch (error) {
      const errorMessage = error.message || "로그인 실패";
      setMessage(errorMessage); // 실패 메시지 설정
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center mt-4">
      {/* 로고 */}
      <Image
        src="/images/main_logo.png"
        alt="최애의포토 로고"
        width={330.82}
        height={60}
        className="mb-12"
      />

      <form className="flex flex-col w-auto gap-[10px]" onSubmit={handleLogin}>
        {/* 이메일 입력 */}
        <EmailInput
          size="L"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          isError={emailError} // 에러 상태 전달
        />
        {/* 이메일 에러 메시지 */}
        {emailError && (
          <p className="text-customRed text-sm leading-6 font-light mt-1">
            올바른 이메일을 입력해 주세요.
          </p>
        )}

        {/* 비밀번호 입력 */}
        <PasswordInput
          size="L"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          isError={false} // 추가 로직 필요 시 설정
        />

        {/* 로그인 버튼 */}
        <PrimaryButton
          label={loading ? "로그인 중..." : "로그인"}
          type="submit"
          textSize="lg"
          width="520px"
          height="60px"
        />
      </form>

      {/* 메시지 출력 */}
      {message && (
        <p className="mt-4 text-yellow-400 text-sm text-center">{message}</p>
      )}

      {/* 회원가입 링크 */}
      <p className="mt-6 text-center text-white font-normal text-base">
        최애의 포토가 처음이신가요?{" "}
        <Link href="/signup" className="text-customMain underline hover:no-underline">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
