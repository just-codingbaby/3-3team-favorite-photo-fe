import React, { useState } from 'react';
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/router";

export default function Login() {
  const { user, login, logout } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보여주기 상태
  const [message, setMessage] = useState(""); // 로그인 메시지

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ email, password });
      setMessage(`로그인 성공! 환영합니다, ${data.nickName}`);

      router.push('/me');
    } catch (error) {
      // 오류 메시지 처리
      const errorMessage = error.response?.data?.message || "로그인 실패";
      setMessage(errorMessage);
      console.error("로그인 실패:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* 로고 */}
      <Image
        src="/images/main_logo.png"
        alt="최애의포토 로고"
        width={330.82}
        height={60}
        className="mb-12"
        priority
      />

      <div className="w-full max-w-[520px] bg-black p-8 rounded-lg">
        <form onSubmit={handleLogin} className="text-left">
          {/* 이메일 입력 */}
          <div className="mb-4">
            <label htmlFor="email"
                   className="block text-lg font-normal text-gray-300 mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              className="w-full h-[60px] px-4 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6 relative">
            <label htmlFor="password"
                   className="block text-lg font-normal text-gray-300 mb-2">
              비밀번호
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full h-[60px] px-4 pr-12 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute flex right-5 top-0.5 mt-10 items-center justify-center"
              style={{ width: "24px", height: "24px" }}
            >
              <Image
                width={24}
                height={24}
                src={
                  showPassword
                    ? '/images/type=visible.png' // 눈 떠진 아이콘 경로
                    : '/images/type=invisible.png' // 눈 감긴 아이콘 경로
                }
                alt="비밀번호 표시 토글"
              />
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full h-[60px] bg-customMain text-black font-semibold hover:bg-customMain/80 transition"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 로그인 메시지 */}
        {message && <p className="mt-4 text-center text-yellow-400 font-medium">{message}</p>}

        {/* 회원가입 안내문 */}
        <p className="mt-6 text-center text-white font-normal text-base">
          최애의 포토가 처음이신가요?{' '}
          <Link href="/signup"
                className="text-customMain underline hover:no-underline">
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return <>{page}</>;
};